import AddData from "./components/AddData";
import UpdateData from "./components/UpdateData";
import View from "./components/View";
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import ViewSingleList from "./components/ViewSingleList";
function App() {
  return <>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<View/>} />
          <Route path='/add' element={<AddData/>} />
          <Route path='/update/:id' element={<UpdateData/>} />
          <Route path='/view/:id' element={<ViewSingleList/>} />
        </Routes>
    </BrowserRouter>
  </>
}

export default App;
