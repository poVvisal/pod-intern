package com.shipsure.dashboard.controller;

import com.shipsure.dashboard.dto.DashboardResponse;
import com.shipsure.dashboard.dto.DeliveryOrder;
import com.shipsure.dashboard.dto.Kpi;
import com.shipsure.dashboard.dto.PodDetail;
import com.shipsure.dashboard.dto.TimelineEvent;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

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
    new DeliveryOrder("DO-78342", "Atlas Foods", "PNH-N-04", "Dara C.", "13:40", "Signed", "Delivered"),
    new DeliveryOrder("DO-78343", "Mira Retail", "PNH-C-11", "Sophea S.", "14:10", "Photo pending", "In transit"),
    new DeliveryOrder("DO-78344", "Northline Pharma", "PNH-W-02", "Vannak P.", "14:25", "Temperature logged", "At stop"),
    new DeliveryOrder("DO-78345", "Kumo Market", "PNH-S-09", "Srey T.", "15:05", "Damaged item", "Exception"),
    new DeliveryOrder("DO-78346", "Harbor Office", "PNH-E-07", "Rotha R.", "15:30", "Awaiting signature", "In transit")
  );

  private final Map<String, PodDetail> podDetails = Map.of(
    "DO-78342",
    new PodDetail(
      "DO-78342",
      "Atlas Foods",
      "88 Monivong Blvd, Boeung Keng Kang, Phnom Penh",
      "S. Sokha",
      "13:32 Cambodia time",
      "18 cartons",
      "Accepted in full",
      List.of(
        new TimelineEvent("09:12", "Loaded at depot", "Dock 4 scan completed"),
        new TimelineEvent("11:45", "Arrived near site", "Driver checked in within geofence"),
        new TimelineEvent("13:24", "Delivery verified", "18 cartons counted by receiver"),
        new TimelineEvent("13:32", "POD captured", "Signature and proof photo uploaded")
      )
    ),
    "DO-78343",
    new PodDetail(
      "DO-78343",
      "Mira Retail",
      "12 Preah Sisowath Quay, Daun Penh, Phnom Penh",
      "Pending receiver",
      "Awaiting POD",
      "9 totes",
      "In transit",
      List.of(
        new TimelineEvent("09:40", "Loaded at depot", "Route PNH-C-11 assigned"),
        new TimelineEvent("12:15", "Departed previous stop", "Driver uploaded checkpoint photo"),
        new TimelineEvent("13:58", "En route", "ETA adjusted by traffic conditions")
      )
    ),
    "DO-78344",
    new PodDetail(
      "DO-78344",
      "Northline Pharma",
      "45 Russian Federation Blvd, Sen Sok, Phnom Penh",
      "Clinic intake team",
      "At stop",
      "6 cold-chain boxes",
      "Temperature within range",
      List.of(
        new TimelineEvent("08:55", "Temperature checked", "Cold-chain logger started at 2.8 C"),
        new TimelineEvent("11:10", "Arrived near site", "Vehicle reached delivery geofence"),
        new TimelineEvent("14:21", "Awaiting handover", "Receiver verification in progress")
      )
    ),
    "DO-78345",
    new PodDetail(
      "DO-78345",
      "Kumo Market",
      "501 Mao Tse Toung Blvd, Chamkar Mon, Phnom Penh",
      "R. Rithy",
      "15:02 Cambodia time",
      "24 crates",
      "Exception: damaged item",
      List.of(
        new TimelineEvent("10:20", "Loaded at depot", "24 crates scanned to vehicle"),
        new TimelineEvent("14:48", "Delivery attempted", "Receiver reported damaged corner crate"),
        new TimelineEvent("15:02", "Exception captured", "Photo evidence and note uploaded")
      )
    ),
    "DO-78346",
    new PodDetail(
      "DO-78346",
      "Harbor Office",
      "77 Norodom Blvd, Tonle Bassac, Phnom Penh",
      "Reception desk",
      "Awaiting signature",
      "4 parcels",
      "In transit",
      List.of(
        new TimelineEvent("10:05", "Loaded at depot", "Small parcel cage released"),
        new TimelineEvent("13:50", "Route updated", "Driver moved stop after priority delivery"),
        new TimelineEvent("15:12", "Approaching stop", "Estimated arrival in 18 minutes")
      )
    )
  );

  @GetMapping("/dashboard")
  public DashboardResponse dashboard() {
    return new DashboardResponse(kpis, orders, podDetails.get("DO-78342"));
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
    PodDetail podDetail = podDetails.get(id);

    if (podDetail == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "POD detail not found");
    }

    return podDetail;
  }
}
