import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from '@/contexts/AuthContext';
import { apolloClient } from '@/lib/apollo';
import { PracticeDashboard } from '@/pages/PracticeDashboard';
import { QuestionDetailPage } from './pages/QuestionDetailPage';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<PracticeDashboard />} />
            <Route path='/question/:serial' element={<QuestionDetailPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
