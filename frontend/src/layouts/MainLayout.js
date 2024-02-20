import "./MainLayout.css"
const  MainLayout = (props) => {
    return (
      <main className="mainLayout-main-container">
        {props.children}
      </main>
    );
  }
  
  export default MainLayout;