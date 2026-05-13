package com.shipsure.dashboard.dto;

import java.util.List;

public record DashboardResponse(List<Kpi> kpis, List<DeliveryOrder> orders, PodDetail selectedOrder) {}
