import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AddVoCap from "./AddVoCap.tsx"
import About from "./About.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/add",
    element: <AddVoCap />,
  },
  {
    path: "/about",
    element: <About />,
  },
])
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
