import { RouteObject } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { TeamDetailsPage } from '../pages/TeamDetailsPage';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/teams/:teamId',
    element: <TeamDetailsPage />
  }
];

export default routes; 