package com.shipsure.dashboard.controller;

import com.shipsure.dashboard.dto.DashboardResponse;
import com.shipsure.dashboard.dto.DeliveryOrder;
import com.shipsure.dashboard.dto.Kpi;
import com.shipsure.dashboard.dto.PodDetail;
import com.shipsure.dashboard.dto.TimelineEvent;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class DashboardController {
  private final List<Kpi> kpis = List.of(
    new Kpi("Delivered today", "428", "+12.4%", "text-emerald-600"),
    new Kpi("Pending PODs", "36", "-8 since 10:00", "text-amber-600"),
    new Kpi("On-time rate", "94.8%", "+2.1%", "text-sky-600"),
    new Kpi("Exceptions", "11", "3 critical", "text-rose-600")
  );

  private final List<DeliveryOrder> orders = List.of(
    new DeliveryOrder("DO-78342", "Atlas Foods", "BKK-NE-04", "Narin C.", "13:40", "Signed", "Delivered"),
    new DeliveryOrder("DO-78343", "Mira Retail", "BKK-C-11", "May S.", "14:10", "Photo pending", "In transit"),
    new DeliveryOrder("DO-78344", "Northline Pharma", "BKK-W-02", "Arthit P.", "14:25", "Temperature logged", "At stop"),
    new DeliveryOrder("DO-78345", "Kumo Market", "BKK-S-09", "Dao T.", "15:05", "Damaged item", "Exception"),
    new DeliveryOrder("DO-78346", "Harbor Office", "BKK-E-07", "Pim R.", "15:30", "Awaiting signature", "In transit")
  );

  private final PodDetail podDetail = new PodDetail(
    "DO-78342",
    "Atlas Foods",
    "88 Rama IV Rd, Khlong Toei, Bangkok",
    "S. Wattanapong",
    "13:32 ICT",
    "18 cartons",
    "Accepted in full",
    List.of(
      new TimelineEvent("09:12", "Loaded at depot", "Dock 4 scan completed"),
      new TimelineEvent("11:45", "Arrived near site", "Driver checked in within geofence"),
      new TimelineEvent("13:24", "Delivery verified", "18 cartons counted by receiver"),
      new TimelineEvent("13:32", "POD captured", "Signature and proof photo uploaded")
    )
  );

  @GetMapping("/dashboard")
  public DashboardResponse dashboard() {
    return new DashboardResponse(kpis, orders, podDetail);
  }

  @GetMapping("/dashboard/kpis")
  public List<Kpi> kpis() {
    return kpis;
  }

  @GetMapping("/orders")
  public List<DeliveryOrder> orders() {
    return orders;
  }

  @GetMapping("/orders/{id}/pod")
  public PodDetail pod(@PathVariable String id) {
    return podDetail;
  }
}
