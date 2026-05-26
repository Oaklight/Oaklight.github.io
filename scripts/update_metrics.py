#!/usr/bin/env python3
import json
from pathlib import Path
import urllib.parse
import urllib.request
import urllib.error
from datetime import datetime, timezone

PACKAGES = {
    "ToolRegistry": {"pypi": "toolregistry"},
    "llm-rosetta": {"pypi": "llm-rosetta"},
    "argo-proxy": {"pypi": "argo-proxy"},
    "zerodep": {"pypi": "zerodep"},
    "tinyleaf": {"pypi": "tinyleaf"},
    "WeiLink": {"pypi": "weilink"},
    "asr2clip": {"pypi": "asr2clip"},
    "nps-ctl": {"pypi": "nps-ctl"},
    "composerize-minimal": {"docker": "oaklight/composerize"},
}


def fetch_json(url, headers=None):
    request = urllib.request.Request(url, headers=headers or {})
    with urllib.request.urlopen(request, timeout=30) as response:
        return json.load(response)


def fetch_pypi_monthly(package_name):
    try:
        data = fetch_json(
            f"https://pypistats.org/api/packages/{urllib.parse.quote(package_name)}/recent",
            headers={"User-Agent": "oaklight-metrics-updater"},
        )
        monthly = data.get("data", {}).get("last_month")
        if monthly is None:
            return None
        return monthly
    except urllib.error.HTTPError as exc:
        if exc.code == 429:
            return None
        raise


def fetch_docker_pulls(image_name):
    data = fetch_json(
        f"https://hub.docker.com/v2/repositories/{image_name}",
        headers={"User-Agent": "oaklight-metrics-updater"},
    )
    return data.get("pull_count")


def main():
    cache_path = Path("data/metrics.json")
    previous = {}
    if cache_path.exists():
        previous = json.loads(cache_path.read_text(encoding="utf-8"))

    metrics = {
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "projects": {},
    }

    for project, sources in PACKAGES.items():
        entry = {}
        prev_entry = previous.get("projects", {}).get(project, {})
        if "pypi" in sources:
            entry["pypi_monthly"] = fetch_pypi_monthly(sources["pypi"])
            if entry["pypi_monthly"] is None:
                entry["pypi_monthly"] = prev_entry.get("pypi_monthly")
            entry["pypi_package"] = sources["pypi"]
        if "docker" in sources:
            entry["docker_pulls"] = fetch_docker_pulls(sources["docker"])
            entry["docker_image"] = sources["docker"]
        metrics["projects"][project] = entry

    with open("data/metrics.json", "w", encoding="utf-8") as f:
        json.dump(metrics, f, indent=2, ensure_ascii=False)
        f.write("\n")


if __name__ == "__main__":
    main()
