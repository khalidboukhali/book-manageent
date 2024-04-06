import { useEffect, useState } from 'react';
import '../assets/Home.css'
import BookService from '../service/BookService';
import userService from '../service/UserService';
import ReviewService from '../service/ReviewService';
import BookLoanService from '../service/BookLoanService';

interface DataType {
  name: string;
  count: number;
  icon: string;
}


function Home() {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data using your services
        const books = await BookService.getAllBooks();
        const users = await userService.getAllUsers();
        const reviews = await ReviewService.getAllReviews();
        const bookLoans = await BookLoanService.getAllBookLoans();

        // Calculate the counts
        const counts = [
          { name: 'Books', count: books.length, icon: '📚' },
          { name: "Reviews", count: reviews.length, icon: "✍️" },
          { name: 'Users', count: users.length, icon: '👤' },
          { name: "Loans", count: bookLoans.length, icon: "💳" },
        ];

        setData(counts);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      {data.map((item, index) => (
        <div key={index} className="dashboard-card">
          <div className="dashboard-card-icon">{item.icon}</div>
          <div className="dashboard-card-info">
            <div className="dashboard-card-count">{item.count}</div>
            <div className="dashboard-card-name">{item.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
