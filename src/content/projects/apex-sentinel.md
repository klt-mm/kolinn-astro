---
title: "Apex Sentinel"
description: "AI-powered security monitor for distributed cloud infrastructure."
pubDate: 2023-11-05
tags: ["AI", "Security", "Infrastructure"]
techStack: ["Python", "PyTorch", "Go", "Kubernetes"]
githubUrl: "https://github.com/kolinn/apex-sentinel"
liveUrl: "https://apex-sentinel.demo"
image: "/images/projects/apex-sentinel.svg"
---

## The Mission
Detecting anomalies in massive streams of infrastructure logs requires more than just threshold-based alerts. Apex Sentinel uses unsupervised learning to baseline "normal" behavior.

## Core Technology
The system utilizes a Long Short-Term Memory (LSTM) network to analyze sequence patterns in log streams. It's deployed as a set of sidecars within a Kubernetes cluster.

## Results
Successfully identified 95% of simulated zero-day attacks during beta testing with a false positive rate of under 2%.
