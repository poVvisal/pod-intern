package com.shipsure.dashboard.dto;

import java.util.List;

public record PodDetail(
  String id,
  String customer,
  String address,
  String receiver,
  String signedAt,
  String packages,
  String condition,
  List<TimelineEvent> timeline
) {}
