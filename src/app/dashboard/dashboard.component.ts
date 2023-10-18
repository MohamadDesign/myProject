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

  username: string = "";
  password: any = "";
  isSettingShow: boolean = true;
  isDeleteModalShow: boolean = true;
  isAddModalShow: boolean = true;
  nodeNameToDelete: string = "";
  nodeNameToAdd: string = "";
  nodeColorToAdd: number = 1;
  nodeSourceToAdd: string = "";
  nodeTargetToAdd: string = "";
  isDarkTheme: boolean = true;
  themeTitle: string = "";
  filteredNodeId: string[] = [];
  finalResults: string[] = [];

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

  onSearch() {
    const searchTerm = this.nodeNameToAdd.toLowerCase();
    this.filteredNodeId = this.dataService
      .getNodesId()
      .filter((nodeId) => nodeId.toLowerCase().includes(searchTerm));

    this.finalResults = this.filteredNodeId.slice(0, 5);
  }

  selectNode(nodeId: string) {
    console.log("this node is selected : ", nodeId);
    this.nodeNameToAdd = nodeId;
    this.filteredNodeId = [];
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

  deleteNode() {
    const NewNodeInstanceToDelete = new NewNodeClass(this.nodeNameToDelete);
    this.dataService.setData(NewNodeInstanceToDelete);
    this.nodeNameToDelete = "";
    this.isDeleteModalShow = !this.isDeleteModalShow;
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
    this.isAddModalShow = !this.isAddModalShow;
  }

  checkTheme() {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      console.log("Dark mode is preferred.");
      this.isDarkTheme = true;

      // this work cause that mode change not been apply on refresh
      // localStorage.setItem("userTheme", "dark");
    } else {
      console.log("Light mode is preferred.");
      this.isDarkTheme = false;

      // this work cause that mode change not been apply on refresh
      // localStorage.setItem('userTheme', 'light')
    }

    // Check if the user has a theme preference saved in local storage
    const userTheme = localStorage.getItem("userTheme");

    if (userTheme !== null) {
      // Use the saved theme preference from local storage
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
