import { Component, OnInit } from "@angular/core";
import {
  faOutdent,
  faRightToBracket,
  faGear,
  faList,
  faWarning,
  faDiagramSuccessor,
  faFingerprint,
  faSun,
  faMoon,
  faPlus,
  faMinus,
  faPalette,
  faPlay,
  faDatabase,
  faQuestionCircle,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { ActivatedRoute } from "@angular/router";
import { DataService } from "../data.service";
import NewNodeClass from "./NewNodeClass";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  envelope = faOutdent;
  exit = faRightToBracket;
  setting = faGear;
  menu = faList;
  warning = faWarning;
  success = faDiagramSuccessor;
  id = faFingerprint;
  color = faPalette;
  start = faPlay;
  end = faDatabase;
  lightMode = faSun;
  darkMode = faMoon;
  add = faPlus;
  remove = faMinus;
  guid = faQuestionCircle;
  circle = faCircle;

  username: string = "";
  password: any = "";
  isSettingShow: boolean = true;
  isDeleteModalShow: boolean = true;
  isAddModalShow: boolean = true;
  isGuidModalShow: boolean = true;
  nodeNameToDelete: string = "";
  nodeNameToAdd: string = "";
  nodeColorToAdd: number = 1;
  nodeSourceToAdd: string = "";
  nodeTargetToAdd: string = "";
  isDarkTheme: boolean = true;
  themeTitle: string = "";
  filteredNodeId: string[] = [];
  finalResults: string[] = [];
  groupNodeList = [
    { group: 1, color: "text-[#1f77b4]" },
    { group: 2, color: "text-[#ff7f0e]" },
    { group: 3, color: "text-[#2ca02c]" },
    { group: 4, color: "text-[#d62728]" },
    { group: 5, color: "text-[#9467bd]" },
    { group: 6, color: "text-[#e377c2]" },
    { group: 7, color: "text-[#7f7f7f]" },
    { group: 8, color: "text-[#bcbd22]" },
    { group: 9, color: "text-[#17becf]" },
    { group: 10, color: "text-[#1f77b4]" },
  ];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.username = params["username"];
      this.password = params["password"];
    });
    this.checkTheme();
    this.toggleTheme();
  }

  selectNodeToDelete(nodeId: string) {
    console.log("this node is selected : ", nodeId);
    this.nodeNameToDelete = nodeId;
    this.filteredNodeId = [];
  }

  onSearchToDelete() {
    const searchTerm = this.nodeNameToDelete.toLowerCase();
    this.filteredNodeId = this.dataService
      .getNodesId()
      .filter((nodeId) => nodeId.toLowerCase().includes(searchTerm));

    this.finalResults = this.filteredNodeId.slice(0, 5);
  }

  deleteNode() {
    const NewNodeInstanceToDelete = new NewNodeClass(this.nodeNameToDelete);
    this.dataService.setData(NewNodeInstanceToDelete);
    this.nodeNameToDelete = "";
    this.isDeleteModalShow = !this.isDeleteModalShow;
  }

  onSearchToAdd() {
    const searchTerm = this.nodeTargetToAdd.toLowerCase();
    this.filteredNodeId = this.dataService
      .getNodesId()
      .filter((nodeId) => nodeId.toLowerCase().includes(searchTerm));

    this.finalResults = this.filteredNodeId.slice(0, 5);
  }

  selectNodeToAdd(nodeId: string) {
    console.log("this node is selected : ", nodeId);
    this.nodeTargetToAdd = nodeId;
    this.nodeSourceToAdd = this.nodeNameToAdd;
    this.filteredNodeId = [];
  }

  addNode() {
    const newNodeInstanceToAdd = new NewNodeClass(
      this.nodeNameToAdd,
      this.nodeColorToAdd,
      this.nodeSourceToAdd,
      this.nodeTargetToAdd
    );
    this.dataService.setData(newNodeInstanceToAdd);
    this.nodeNameToAdd = "";
    this.nodeSourceToAdd = "";
    this.nodeTargetToAdd = "";
    this.nodeColorToAdd = 1;
    this.isAddModalShow = !this.isAddModalShow;
  }

  selectedGroupColor(nodeGroup: number) {
    console.log(nodeGroup);
    this.isGuidModalShow = !this.isGuidModalShow;
    this.nodeColorToAdd = nodeGroup;
  }

  showSetting() {
    this.isSettingShow = !this.isSettingShow;
  }

  showDeleteModal() {
    this.isDeleteModalShow = !this.isDeleteModalShow;
  }

  showAddModal() {
    this.isAddModalShow = !this.isAddModalShow;
  }

  showGuidModal() {
    this.isGuidModalShow = !this.isGuidModalShow;
  }

  checkTheme() {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      console.log("Dark mode is preferred.");
      this.isDarkTheme = true;
    } else {
      console.log("Light mode is preferred.");
      this.isDarkTheme = false;
    }
    const userTheme = localStorage.getItem("userTheme");

    if (userTheme !== null) {
      this.isDarkTheme = userTheme === "dark";
    }
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    if (this.isDarkTheme) {
      document.body.className = "light";
      localStorage.setItem("userTheme", "light");
      this.themeTitle = "شب";
    } else {
      document.body.className = "dark";
      localStorage.setItem("userTheme", "dark");
      this.themeTitle = "روز";
    }
  }
}
