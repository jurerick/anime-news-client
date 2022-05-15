import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Col, Layout, Row, Typography } from "antd";
import { MockNews, News } from './sections';
import { Home, AppHeader } from "./sections";
import "./styles/index.css";

const { Text, Link } = Typography;
const { Footer } = Layout;

export const App = () => {
  return (
    <Router>
      <AppHeader  />
      <Layout id='app'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news/popular" element={<News />} />
          <Route path="/news/mock" element={<MockNews />} />
        </Routes>
      </Layout>
      <Footer>
        <Row>
          <Col span={12}><Text strong>Anime News</Text> © 2022</Col>
          <Col span={12}>
            <div style={{textAlign: "right"}}>
              This app is created by {" "} <Link href="https://github.com/jurerick" target="_blank">Jur Erick Porras</Link> 
              {" "} and is for demo purpose only.
            </div>
          </Col>
        </Row>  
      </Footer>
    </Router>
  );
}
