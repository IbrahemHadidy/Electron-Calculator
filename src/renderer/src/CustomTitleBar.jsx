import "./CustomTitleBar.css";

const CustomTitleBar = () => {
  const handleCloseClick = (e) => {
    e.preventDefault();
    window.electronAPI.closeWindow();
  };
  const handleMinimizeClick = (e) => {
    e.preventDefault();
    window.electronAPI.minimizeWindow();
  };

  return (
    <div id="custom-title-bar">
      <div id="icon"></div>
      <div id="title">Calculator</div>
      <div id="drag"></div>
      <button id="minimize" onClick={handleMinimizeClick}>
        &minus;
      </button>
      <button id="close" onClick={handleCloseClick}>
        &times;
      </button>
    </div>
  );
};

export default CustomTitleBar;
