import Friends from "../Friends/Friends";
import SearchBar from "../SearchBar";
import "./Sidebar.css";

function SideBar() {
  return (
    <div id="side-bar-cntr">
      <a id="all-expenses-a-tag" href="/bills">
        <div id="all-expenses-side">
          <i class="fa-solid fa-list"></i> All Expenses
        </div>
      </a>
      <Friends />
      <div id="sidebar-search">
        <div id="find-friends-header">Find Friends</div>
        <SearchBar />
      </div>
    </div>
  );
}

export default SideBar;
