// ResultsPage.js
import React, { useState, useEffect } from 'react';
import { Typography, Container, Box } from '@mui/material';
import Layout from './Layout';
import axios from 'axios';

const ResultsPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/categories');
        if (response.data.respCode === 200) {
          setCategories(response.data.respData);
        } else {
          console.error('Error fetching categories:', response.data.respMessage);
        }
      } catch (error) {
        console.error('Network error:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <Container>
        <Box textAlign="center" mt={12}>
          <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '24px', fontSize: '3rem' }}>
            Results Page
          </Typography>
          <Typography variant="h5" style={{ marginBottom: '16px', fontSize: '2rem' }}>
            Categories:
          </Typography>
          <ul>
            {categories.map(category => (
              <li key={category.id}>{category.title}</li>
            ))}
          </ul>
        </Box>
      </Container>
    </Layout>
  );
};

export default ResultsPage;
