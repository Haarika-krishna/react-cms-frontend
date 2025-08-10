import React, { useEffect, useState } from 'react';

function PagesList({ isAdmin, authToken }) {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const endpoint = isAdmin ? '/api/pages' : '/api/pages/mine';
        const res = await fetch(`http://localhost:5000${endpoint}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
          }
        });
        const data = await res.json();
        setPages(data);
      } catch (error) {
        console.error('Error fetching pages:', error);
      }
    };

    fetchPages();
  }, [isAdmin, authToken]);

  return (
    <div>
      <h2>{isAdmin ? 'All Pages' : 'My Pages'}</h2>
      {pages.length === 0 ? (
        <p>No pages found.</p>
      ) : (
        <ul>
          {pages.map(page => (
            <li key={page._id}>
              {page.title} {isAdmin && <span>({page.user?.name})</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PagesList;
