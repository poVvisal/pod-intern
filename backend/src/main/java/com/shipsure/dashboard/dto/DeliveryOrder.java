package com.shipsure.dashboard.dto;

public record DeliveryOrder(
  String id,
  String customer,
  String route,
  String driver,
  String eta,
  String pod,
  String status
) {}
