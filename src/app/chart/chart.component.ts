import { Component, ElementRef, OnInit } from "@angular/core";
import * as d3 from "d3";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { DataService } from "../data.service";
import NewNodeClass from "../dashboard/NewNodeClass";

interface NodeData extends d3.SimulationNodeDatum {
  id: string;
  group: number;
}

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.css"],
})
export class ChartComponent implements OnInit {
  private simulation!: d3.Simulation<NodeData, undefined>;
  private svg!: d3.Selection<SVGSVGElement, unknown, null, undefined>;

  constructor(private el: ElementRef, private dataService: DataService) {}
  logOut = faPowerOff;
  nodeNameToDelete = "";
  isFirstLoad: boolean = false;

  newNode = {
    id: "",
    group: 0,
  };
  newLink = {
    source: "",
    target: "",
    value: 1,
  };

  data = {
    nodes: [
      { id: "Myriel", group: 1 },
      { id: "Napoleon", group: 1 },
      { id: "Mlle.Baptistine", group: 1 },
      { id: "Mme.Magloire", group: 1 },
      { id: "CountessdeLo", group: 1 },
      { id: "Geborand", group: 1 },
      { id: "Champtercier", group: 1 },
      { id: "Cravatte", group: 1 },
      { id: "Count", group: 1 },
      { id: "OldMan", group: 1 },
      { id: "Labarre", group: 2 },
      { id: "Valjean", group: 2 },
      { id: "Marguerite", group: 3 },
      { id: "Mme.deR", group: 2 },
      { id: "Isabeau", group: 2 },
      { id: "Gervais", group: 2 },
      { id: "Tholomyes", group: 3 },
      { id: "Listolier", group: 3 },
      { id: "Fameuil", group: 3 },
      { id: "Blacheville", group: 3 },
      { id: "Favourite", group: 3 },
      { id: "Dahlia", group: 3 },
      { id: "Zephine", group: 3 },
      { id: "Fantine", group: 3 },
      { id: "Mme.Thenardier", group: 4 },
      { id: "Thenardier", group: 4 },
      { id: "Cosette", group: 5 },
      { id: "Javert", group: 4 },
      { id: "Fauchelevent", group: 0 },
      { id: "Bamatabois", group: 2 },
      { id: "Perpetue", group: 3 },
      { id: "Simplice", group: 2 },
      { id: "Scaufflaire", group: 2 },
      { id: "Woman1", group: 2 },
      { id: "Judge", group: 2 },
      { id: "Champmathieu", group: 2 },
      { id: "Brevet", group: 2 },
      { id: "Chenildieu", group: 2 },
      { id: "Cochepaille", group: 2 },
      { id: "Pontmercy", group: 4 },
      { id: "Boulatruelle", group: 6 },
      { id: "Eponine", group: 4 },
      { id: "Anzelma", group: 4 },
      { id: "Woman2", group: 5 },
      { id: "MotherInnocent", group: 0 },
      { id: "Gribier", group: 0 },
      { id: "Jondrette", group: 7 },
      { id: "Mme.Burgon", group: 7 },
      { id: "Gavroche", group: 8 },
      { id: "Gillenormand", group: 5 },
      { id: "Magnon", group: 5 },
      { id: "Mlle.Gillenormand", group: 5 },
      { id: "Mme.Pontmercy", group: 5 },
      { id: "Mlle.Vaubois", group: 5 },
      { id: "Lt.Gillenormand", group: 5 },
      { id: "Marius", group: 8 },
      { id: "BaronessT", group: 5 },
      { id: "Mabeuf", group: 8 },
      { id: "Enjolras", group: 8 },
      { id: "Combeferre", group: 8 },
      { id: "Prouvaire", group: 8 },
      { id: "Feuilly", group: 8 },
      { id: "Courfeyrac", group: 8 },
      { id: "Bahorel", group: 8 },
      { id: "Bossuet", group: 8 },
      { id: "Joly", group: 8 },
      { id: "Grantaire", group: 8 },
      { id: "MotherPlutarch", group: 9 },
      { id: "Gueulemer", group: 4 },
      { id: "Babet", group: 4 },
      { id: "Claquesous", group: 4 },
      { id: "Montparnasse", group: 4 },
      { id: "Toussaint", group: 5 },
      { id: "Child1", group: 10 },
      { id: "Child2", group: 10 },
      { id: "Brujon", group: 4 },
      { id: "Mme.Hucheloup", group: 8 },
    ],
    links: [
      { source: "Napoleon", target: "Myriel", value: 1 },
      { source: "Mlle.Baptistine", target: "Myriel", value: 8 },
      { source: "Mme.Magloire", target: "Myriel", value: 10 },
      { source: "Mme.Magloire", target: "Mlle.Baptistine", value: 6 },
      { source: "CountessdeLo", target: "Myriel", value: 1 },
      { source: "Geborand", target: "Myriel", value: 1 },
      { source: "Champtercier", target: "Myriel", value: 1 },
      { source: "Cravatte", target: "Myriel", value: 1 },
      { source: "Count", target: "Myriel", value: 2 },
      { source: "OldMan", target: "Myriel", value: 1 },
      { source: "Valjean", target: "Labarre", value: 1 },
      { source: "Valjean", target: "Mme.Magloire", value: 3 },
      { source: "Valjean", target: "Mlle.Baptistine", value: 3 },
      { source: "Valjean", target: "Myriel", value: 5 },
      { source: "Marguerite", target: "Valjean", value: 1 },
      { source: "Mme.deR", target: "Valjean", value: 1 },
      { source: "Isabeau", target: "Valjean", value: 1 },
      { source: "Gervais", target: "Valjean", value: 1 },
      { source: "Listolier", target: "Tholomyes", value: 4 },
      { source: "Fameuil", target: "Tholomyes", value: 4 },
      { source: "Fameuil", target: "Listolier", value: 4 },
      { source: "Blacheville", target: "Tholomyes", value: 4 },
      { source: "Blacheville", target: "Listolier", value: 4 },
      { source: "Blacheville", target: "Fameuil", value: 4 },
      { source: "Favourite", target: "Tholomyes", value: 3 },
      { source: "Favourite", target: "Listolier", value: 3 },
      { source: "Favourite", target: "Fameuil", value: 3 },
      { source: "Favourite", target: "Blacheville", value: 4 },
      { source: "Dahlia", target: "Tholomyes", value: 3 },
      { source: "Dahlia", target: "Listolier", value: 3 },
      { source: "Dahlia", target: "Fameuil", value: 3 },
      { source: "Dahlia", target: "Blacheville", value: 3 },
      { source: "Dahlia", target: "Favourite", value: 5 },
      { source: "Zephine", target: "Tholomyes", value: 3 },
      { source: "Zephine", target: "Listolier", value: 3 },
      { source: "Zephine", target: "Fameuil", value: 3 },
      { source: "Zephine", target: "Blacheville", value: 3 },
      { source: "Zephine", target: "Favourite", value: 4 },
      { source: "Zephine", target: "Dahlia", value: 4 },
      { source: "Fantine", target: "Tholomyes", value: 3 },
      { source: "Fantine", target: "Listolier", value: 3 },
      { source: "Fantine", target: "Fameuil", value: 3 },
      { source: "Fantine", target: "Blacheville", value: 3 },
      { source: "Fantine", target: "Favourite", value: 4 },
      { source: "Fantine", target: "Dahlia", value: 4 },
      { source: "Fantine", target: "Zephine", value: 4 },
      { source: "Fantine", target: "Marguerite", value: 2 },
      { source: "Fantine", target: "Valjean", value: 9 },
      { source: "Mme.Thenardier", target: "Fantine", value: 2 },
      { source: "Mme.Thenardier", target: "Valjean", value: 7 },
      { source: "Thenardier", target: "Mme.Thenardier", value: 13 },
      { source: "Thenardier", target: "Fantine", value: 1 },
      { source: "Thenardier", target: "Valjean", value: 12 },
      { source: "Cosette", target: "Mme.Thenardier", value: 4 },
      { source: "Cosette", target: "Valjean", value: 31 },
      { source: "Cosette", target: "Tholomyes", value: 1 },
      { source: "Cosette", target: "Thenardier", value: 1 },
      { source: "Javert", target: "Valjean", value: 17 },
      { source: "Javert", target: "Fantine", value: 5 },
      { source: "Javert", target: "Thenardier", value: 5 },
      { source: "Javert", target: "Mme.Thenardier", value: 1 },
      { source: "Javert", target: "Cosette", value: 1 },
      { source: "Fauchelevent", target: "Valjean", value: 8 },
      { source: "Fauchelevent", target: "Javert", value: 1 },
      { source: "Bamatabois", target: "Fantine", value: 1 },
      { source: "Bamatabois", target: "Javert", value: 1 },
      { source: "Bamatabois", target: "Valjean", value: 2 },
      { source: "Perpetue", target: "Fantine", value: 1 },
      { source: "Simplice", target: "Perpetue", value: 2 },
      { source: "Simplice", target: "Valjean", value: 3 },
      { source: "Simplice", target: "Fantine", value: 2 },
      { source: "Simplice", target: "Javert", value: 1 },
      { source: "Scaufflaire", target: "Valjean", value: 1 },
      { source: "Woman1", target: "Valjean", value: 2 },
      { source: "Woman1", target: "Javert", value: 1 },
      { source: "Judge", target: "Valjean", value: 3 },
      { source: "Judge", target: "Bamatabois", value: 2 },
      { source: "Champmathieu", target: "Valjean", value: 3 },
      { source: "Champmathieu", target: "Judge", value: 3 },
      { source: "Champmathieu", target: "Bamatabois", value: 2 },
      { source: "Brevet", target: "Judge", value: 2 },
      { source: "Brevet", target: "Champmathieu", value: 2 },
      { source: "Brevet", target: "Valjean", value: 2 },
      { source: "Brevet", target: "Bamatabois", value: 1 },
      { source: "Chenildieu", target: "Judge", value: 2 },
      { source: "Chenildieu", target: "Champmathieu", value: 2 },
      { source: "Chenildieu", target: "Brevet", value: 2 },
      { source: "Chenildieu", target: "Valjean", value: 2 },
      { source: "Chenildieu", target: "Bamatabois", value: 1 },
      { source: "Cochepaille", target: "Judge", value: 2 },
      { source: "Cochepaille", target: "Champmathieu", value: 2 },
      { source: "Cochepaille", target: "Brevet", value: 2 },
      { source: "Cochepaille", target: "Chenildieu", value: 2 },
      { source: "Cochepaille", target: "Valjean", value: 2 },
      { source: "Cochepaille", target: "Bamatabois", value: 1 },
      { source: "Pontmercy", target: "Thenardier", value: 1 },
      { source: "Boulatruelle", target: "Thenardier", value: 1 },
      { source: "Eponine", target: "Mme.Thenardier", value: 2 },
      { source: "Eponine", target: "Thenardier", value: 3 },
      { source: "Anzelma", target: "Eponine", value: 2 },
      { source: "Anzelma", target: "Thenardier", value: 2 },
      { source: "Anzelma", target: "Mme.Thenardier", value: 1 },
      { source: "Woman2", target: "Valjean", value: 3 },
      { source: "Woman2", target: "Cosette", value: 1 },
      { source: "Woman2", target: "Javert", value: 1 },
      { source: "MotherInnocent", target: "Fauchelevent", value: 3 },
      { source: "MotherInnocent", target: "Valjean", value: 1 },
      { source: "Gribier", target: "Fauchelevent", value: 2 },
      { source: "Mme.Burgon", target: "Jondrette", value: 1 },
      { source: "Gavroche", target: "Mme.Burgon", value: 2 },
      { source: "Gavroche", target: "Thenardier", value: 1 },
      { source: "Gavroche", target: "Javert", value: 1 },
      { source: "Gavroche", target: "Valjean", value: 1 },
      { source: "Gillenormand", target: "Cosette", value: 3 },
      { source: "Gillenormand", target: "Valjean", value: 2 },
      { source: "Magnon", target: "Gillenormand", value: 1 },
      { source: "Magnon", target: "Mme.Thenardier", value: 1 },
      { source: "Mlle.Gillenormand", target: "Gillenormand", value: 9 },
      { source: "Mlle.Gillenormand", target: "Cosette", value: 2 },
      { source: "Mlle.Gillenormand", target: "Valjean", value: 2 },
      { source: "Mme.Pontmercy", target: "Mlle.Gillenormand", value: 1 },
      { source: "Mme.Pontmercy", target: "Pontmercy", value: 1 },
      { source: "Mlle.Vaubois", target: "Mlle.Gillenormand", value: 1 },
      { source: "Lt.Gillenormand", target: "Mlle.Gillenormand", value: 2 },
      { source: "Lt.Gillenormand", target: "Gillenormand", value: 1 },
      { source: "Lt.Gillenormand", target: "Cosette", value: 1 },
      { source: "Marius", target: "Mlle.Gillenormand", value: 6 },
      { source: "Marius", target: "Gillenormand", value: 12 },
      { source: "Marius", target: "Pontmercy", value: 1 },
      { source: "Marius", target: "Lt.Gillenormand", value: 1 },
      { source: "Marius", target: "Cosette", value: 21 },
      { source: "Marius", target: "Valjean", value: 19 },
      { source: "Marius", target: "Tholomyes", value: 1 },
      { source: "Marius", target: "Thenardier", value: 2 },
      { source: "Marius", target: "Eponine", value: 5 },
      { source: "Marius", target: "Gavroche", value: 4 },
      { source: "BaronessT", target: "Gillenormand", value: 1 },
      { source: "BaronessT", target: "Marius", value: 1 },
      { source: "Mabeuf", target: "Marius", value: 1 },
      { source: "Mabeuf", target: "Eponine", value: 1 },
      { source: "Mabeuf", target: "Gavroche", value: 1 },
      { source: "Enjolras", target: "Marius", value: 7 },
      { source: "Enjolras", target: "Gavroche", value: 7 },
      { source: "Enjolras", target: "Javert", value: 6 },
      { source: "Enjolras", target: "Mabeuf", value: 1 },
      { source: "Enjolras", target: "Valjean", value: 4 },
      { source: "Combeferre", target: "Enjolras", value: 15 },
      { source: "Combeferre", target: "Marius", value: 5 },
      { source: "Combeferre", target: "Gavroche", value: 6 },
      { source: "Combeferre", target: "Mabeuf", value: 2 },
      { source: "Prouvaire", target: "Gavroche", value: 1 },
      { source: "Prouvaire", target: "Enjolras", value: 4 },
      { source: "Prouvaire", target: "Combeferre", value: 2 },
      { source: "Feuilly", target: "Gavroche", value: 2 },
      { source: "Feuilly", target: "Enjolras", value: 6 },
      { source: "Feuilly", target: "Prouvaire", value: 2 },
      { source: "Feuilly", target: "Combeferre", value: 5 },
      { source: "Feuilly", target: "Mabeuf", value: 1 },
      { source: "Feuilly", target: "Marius", value: 1 },
      { source: "Courfeyrac", target: "Marius", value: 9 },
      { source: "Courfeyrac", target: "Enjolras", value: 17 },
      { source: "Courfeyrac", target: "Combeferre", value: 13 },
      { source: "Courfeyrac", target: "Gavroche", value: 7 },
      { source: "Courfeyrac", target: "Mabeuf", value: 2 },
      { source: "Courfeyrac", target: "Eponine", value: 1 },
      { source: "Courfeyrac", target: "Feuilly", value: 6 },
      { source: "Courfeyrac", target: "Prouvaire", value: 3 },
      { source: "Bahorel", target: "Combeferre", value: 5 },
      { source: "Bahorel", target: "Gavroche", value: 5 },
      { source: "Bahorel", target: "Courfeyrac", value: 6 },
      { source: "Bahorel", target: "Mabeuf", value: 2 },
      { source: "Bahorel", target: "Enjolras", value: 4 },
      { source: "Bahorel", target: "Feuilly", value: 3 },
      { source: "Bahorel", target: "Prouvaire", value: 2 },
      { source: "Bahorel", target: "Marius", value: 1 },
      { source: "Bossuet", target: "Marius", value: 5 },
      { source: "Bossuet", target: "Courfeyrac", value: 12 },
      { source: "Bossuet", target: "Gavroche", value: 5 },
      { source: "Bossuet", target: "Bahorel", value: 4 },
      { source: "Bossuet", target: "Enjolras", value: 10 },
      { source: "Bossuet", target: "Feuilly", value: 6 },
      { source: "Bossuet", target: "Prouvaire", value: 2 },
      { source: "Bossuet", target: "Combeferre", value: 9 },
      { source: "Bossuet", target: "Mabeuf", value: 1 },
      { source: "Bossuet", target: "Valjean", value: 1 },
      { source: "Joly", target: "Bahorel", value: 5 },
      { source: "Joly", target: "Bossuet", value: 7 },
      { source: "Joly", target: "Gavroche", value: 3 },
      { source: "Joly", target: "Courfeyrac", value: 5 },
      { source: "Joly", target: "Enjolras", value: 5 },
      { source: "Joly", target: "Feuilly", value: 5 },
      { source: "Joly", target: "Prouvaire", value: 2 },
      { source: "Joly", target: "Combeferre", value: 5 },
      { source: "Joly", target: "Mabeuf", value: 1 },
      { source: "Joly", target: "Marius", value: 2 },
      { source: "Grantaire", target: "Bossuet", value: 3 },
      { source: "Grantaire", target: "Enjolras", value: 3 },
      { source: "Grantaire", target: "Combeferre", value: 1 },
      { source: "Grantaire", target: "Courfeyrac", value: 2 },
      { source: "Grantaire", target: "Joly", value: 2 },
      { source: "Grantaire", target: "Gavroche", value: 1 },
      { source: "Grantaire", target: "Bahorel", value: 1 },
      { source: "Grantaire", target: "Feuilly", value: 1 },
      { source: "Grantaire", target: "Prouvaire", value: 1 },
      { source: "MotherPlutarch", target: "Mabeuf", value: 3 },
      { source: "Gueulemer", target: "Thenardier", value: 5 },
      { source: "Gueulemer", target: "Valjean", value: 1 },
      { source: "Gueulemer", target: "Mme.Thenardier", value: 1 },
      { source: "Gueulemer", target: "Javert", value: 1 },
      { source: "Gueulemer", target: "Gavroche", value: 1 },
      { source: "Gueulemer", target: "Eponine", value: 1 },
      { source: "Babet", target: "Thenardier", value: 6 },
      { source: "Babet", target: "Gueulemer", value: 6 },
      { source: "Babet", target: "Valjean", value: 1 },
      { source: "Babet", target: "Mme.Thenardier", value: 1 },
      { source: "Babet", target: "Javert", value: 2 },
      { source: "Babet", target: "Gavroche", value: 1 },
      { source: "Babet", target: "Eponine", value: 1 },
      { source: "Claquesous", target: "Thenardier", value: 4 },
      { source: "Claquesous", target: "Babet", value: 4 },
      { source: "Claquesous", target: "Gueulemer", value: 4 },
      { source: "Claquesous", target: "Valjean", value: 1 },
      { source: "Claquesous", target: "Mme.Thenardier", value: 1 },
      { source: "Claquesous", target: "Javert", value: 1 },
      { source: "Claquesous", target: "Eponine", value: 1 },
      { source: "Claquesous", target: "Enjolras", value: 1 },
      { source: "Montparnasse", target: "Javert", value: 1 },
      { source: "Montparnasse", target: "Babet", value: 2 },
      { source: "Montparnasse", target: "Gueulemer", value: 2 },
      { source: "Montparnasse", target: "Claquesous", value: 2 },
      { source: "Montparnasse", target: "Valjean", value: 1 },
      { source: "Montparnasse", target: "Gavroche", value: 1 },
      { source: "Montparnasse", target: "Eponine", value: 1 },
      { source: "Montparnasse", target: "Thenardier", value: 1 },
      { source: "Toussaint", target: "Cosette", value: 2 },
      { source: "Toussaint", target: "Javert", value: 1 },
      { source: "Toussaint", target: "Valjean", value: 1 },
      { source: "Child1", target: "Gavroche", value: 2 },
      { source: "Child2", target: "Gavroche", value: 2 },
      { source: "Child2", target: "Child1", value: 3 },
      { source: "Brujon", target: "Babet", value: 3 },
      { source: "Brujon", target: "Gueulemer", value: 3 },
      { source: "Brujon", target: "Thenardier", value: 3 },
      { source: "Brujon", target: "Gavroche", value: 1 },
      { source: "Brujon", target: "Eponine", value: 1 },
      { source: "Brujon", target: "Claquesous", value: 1 },
      { source: "Brujon", target: "Montparnasse", value: 1 },
      { source: "Mme.Hucheloup", target: "Bossuet", value: 1 },
      { source: "Mme.Hucheloup", target: "Joly", value: 1 },
      { source: "Mme.Hucheloup", target: "Grantaire", value: 1 },
      { source: "Mme.Hucheloup", target: "Bahorel", value: 1 },
      { source: "Mme.Hucheloup", target: "Courfeyrac", value: 1 },
      { source: "Mme.Hucheloup", target: "Gavroche", value: 1 },
      { source: "Mme.Hucheloup", target: "Enjolras", value: 1 },
    ],
  };

  ngOnInit(): void {
    this.deleteNode();
    this.addNode();
    this.createChart();
  }

  // deleteNode() {
  //   this.dataService.currentData.subscribe(
  //     (newNodeInstance: NewNodeClass | null) => {
  //       this.nodeNameToDelete = newNodeInstance?.nodeId || "";

  //       const nodeIndex = this.data.nodes.findIndex(
  //         (node) => node.id === this.nodeNameToDelete
  //       );

  //       if (nodeIndex !== -1) {
  //         this.data.nodes.splice(nodeIndex, 1);
  //         this.data.links = this.data.links.filter(
  //           (link) =>
  //             link.source !== this.nodeNameToDelete &&
  //             link.target !== this.nodeNameToDelete
  //         );
  //         this.ReCreateChart();
  //         this.nodeNameToDelete = "";
  //       } else {
  //         console.error("نام نود مورد نظر یافت نشد");
  //       }
  //     }
  //   );
  // }

  deleteNode() {
    this.dataService.currentData.subscribe(
      (newNodeInstance: NewNodeClass | null) => {
        this.nodeNameToDelete = newNodeInstance?.nodeId || "";

        const nodeIndex = this.data.nodes.findIndex(
          (node) => node.id === this.nodeNameToDelete
        );

        if (nodeIndex !== -1) {
          const updatedNodes = [...this.data.nodes];
          updatedNodes.splice(nodeIndex, 1);

          const updatedLinks = this.data.links.filter(
            (link) =>
              link.source !== this.nodeNameToDelete &&
              link.target !== this.nodeNameToDelete
          );

          // Update the data immutably
          this.data = {
            nodes: updatedNodes,
            links: updatedLinks,
          };

          // Re-create the chart
          this.ReCreateChart();

          this.nodeNameToDelete = "";
        } else {
          console.error("نام نود مورد نظر یافت نشد");
          // Display a user-friendly error message in the UI if needed.
        }
      }
    );
  }

  // addNode() {
  //   this.dataService.currentData.subscribe(
  //     (newNodeInstance: NewNodeClass | null) => {
  //       if (newNodeInstance === null) {
  //       } else {
  //         this.newNode.id = newNodeInstance.nodeId;
  //         this.newNode.group = newNodeInstance.group;

  //         if (
  //           this.newNode.id &&
  //           !this.data.nodes.find((node) => node.id === this.newNode.id)
  //         ) {
  //           this.data.nodes.push({
  //             id: newNodeInstance.nodeId,
  //             group: newNodeInstance.group,
  //           });
  //           this.data.links.push({
  //             source: newNodeInstance.source,
  //             target: newNodeInstance.target,
  //             value: 1,
  //           });
  //           this.ReCreateChart();
  //         } else {
  //           console.log("دقت کنید");
  //         }
  //       }
  //     }
  //   );
  // }

  addNode() {
    this.dataService.currentData.subscribe(
      (newNodeInstance: NewNodeClass | null) => {
        if (!newNodeInstance) {
          // Handle the case where newNodeInstance is null (if needed).
          console.error("New node data is missing.");
          return;
        } else {
          const nodeExists = this.data.nodes.some(
            (node) => node.id === newNodeInstance.nodeId
          );

          if (nodeExists) {
            console.error("A node with the same ID already exists.");
            return;
          }

          const newNode = {
            id: newNodeInstance.nodeId,
            group: newNodeInstance.group,
          };

          const newLink = {
              source: newNodeInstance.source,
              target: newNodeInstance.target,
              value: 1,
            };

          // Update data immutably
          this.data = {
            nodes: [...this.data.nodes, newNode],
            links: [...this.data.links, newLink],
          };

          // Re-create the chart
            this.ReCreateChart();
                  }
      }
    );
  }

  createChart() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const hoveredNodes = new Set();
    this.svg = d3
      .select(this.el.nativeElement)
      .select("div")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const links = this.data.links.map((d: any) => ({ ...d }));
    const nodes: any = this.data.nodes.map((d: any) => ({ ...d }));

    this.simulation = d3
      .forceSimulation<NodeData>(nodes)
      .force(
        "link",
        d3.forceLink(links).id((d: any) => d.id)
      )
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2))
      .on("tick", ticked);

    const dragstarted = (event: any) => {
      if (!event.active) this.simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    };

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    const dragended = (event: any) => {
      if (!event.active) this.simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    };

    const link = this.svg
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll()
      .data(links)
      .join("line")
      .attr("stroke-width", (d: any) => Math.sqrt(d.value));

    const node = this.svg
      .selectAll<SVGCircleElement, any>("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", 5)
      .attr("fill", (d: any) => color(d.group))
      .call(
        d3
          .drag<SVGCircleElement, any>()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      )
      .on("mouseover", function (event, d: any) {
        const tooltip = d3.select(".tooltip-container");
        tooltip.style("opacity", 0.9);

        tooltip.html(
          `<app-tooltip><strong>Node id : ${d.id}</strong> <div>Node group : ${d.group}</div></app-tooltip>`
        );

        tooltip.style("left", event.pageX - 40 + "px");
        tooltip.style("top", event.pageY - 20 + "px");
        hoveredNodes.add(d);

        d3.select(this)
          .attr("r", 8)
          .attr("fill", "#d55bd9")
          .style("cursor", "pointer");

        link.attr("stroke", (l: any) =>
          (l.source === d && l.target.length === d.length) ||
          (l.target === d && l.source.length === d.length)
            ? "blue"
            : "#999"
        );
      })
      .on("mouseout", function (event, d) {
        const tooltip = d3.select(".tooltip-container");
        tooltip.style("opacity", 0);

        hoveredNodes.delete(d);

        d3.select(this)
          .attr("r", 5)
          .attr("fill", (d: any) => color(d.group))
          .style("cursor", "auto");

        link.attr("stroke", "#999");
      });

    function ticked() {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y);
    }
    return this.svg.node();
  }

  ReCreateChart() {
    this.svg.selectAll("*").remove();

    const self = this;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const hoveredNodes = new Set();

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const links = this.data.links.map((d) => ({ ...d }));
    const nodes: any = this.data.nodes.map((d) => ({ ...d }));

    this.simulation = d3
      .forceSimulation<NodeData>(nodes)
      .force(
        "link",
        d3.forceLink(links).id((d: any) => d.id)
      )
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2))
      .on("tick", ticked);

    const dragstarted = (event: any) => {
      if (!event.active) this.simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    };

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    const dragended = (event: any) => {
      if (!event.active) this.simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    };

    const link = this.svg
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll()
      .data(links)
      .join("line")
      .attr("stroke-width", (d) => Math.sqrt(d.value));

    const node = this.svg
      .selectAll<SVGCircleElement, any>("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", 5)
      .attr("fill", (d: any) => color(d.group))
      .call(
        d3
          .drag<SVGCircleElement, any>()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      )
      .on("mouseover", function (event, d: any) {
        const existingNode = self.simulation
          .nodes()
          .find((node: any) => node.id === d.id);
        if (existingNode) {
          existingNode.fx = existingNode.x;
          existingNode.fy = existingNode.y;
        }

        const tooltip = d3.select(".tooltip-container");
        tooltip.style("opacity", 0.9);

        tooltip.html(
          `<app-tooltip><strong>Node id : ${d.id}</strong> <div>Node group : ${d.group}</div></app-tooltip>`
        );

        tooltip.style("left", event.pageX - 40 + "px");
        tooltip.style("top", event.pageY - 20 + "px");
        hoveredNodes.add(d);

        d3.select(this)
          .attr("r", 8)
          .attr("fill", "#d55bd9")
          .style("cursor", "pointer");

        link.attr("stroke", (l) =>
          (l.source === d && l.target.length === d.length) ||
          (l.target === d && l.source.length === d.length)
            ? "blue"
            : "#999"
        );
      })
      .on("mouseout", function (event, d) {
        const tooltip = d3.select(".tooltip-container");
        tooltip.style("opacity", 0);

        hoveredNodes.delete(d);

        d3.select(this)
          .attr("r", 5)
          .attr("fill", (d: any) => color(d.group))
          .style("cursor", "auto");

        link.attr("stroke", "#999");
      });

    function ticked() {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y);
    }
    return this.svg.node();
  }
}
