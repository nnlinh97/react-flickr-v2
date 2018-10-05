import React from 'react';
import Explore from './pages/Explore';
import Tag from './pages/Tag';
import Photo from './pages/Photo';
import NotFoundPage from './pages/NotFoundPage';

const routes = [
    {
        path: '/',
        exact: true,
        main: () => <Explore />
    },
    {
        path: '/photos/tags/:tag',
        exact: true,
        main: ({ match }) => <Tag match={match} />
    },
    {
        path: '/photos/:id',
        exact: true,
        main: ({ match }) => <Photo match={match} />
    },
    {
        path: '',
        exact: true,
        main: () => <NotFoundPage />
    },
];

export default routes;