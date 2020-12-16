import React, { useCallback, useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { BookingDataContext } from 'containers/data_context';

import routes from 'routing/routes';

import buildPath from 'utils/build_path';

import NavItem from './nav_item';

import styles from './navigation.module.css';

export default function Navigation() {
  const { channelId } = useContext(BookingDataContext);
  const history = useHistory();
  const { t } = useTranslation();

  const navRoutes = [
    {
      eventKey: 'hotelPage',
      match: useRouteMatch({ path: routes.hotelPage, strict: true }),
      title: t('navigation:hotel_page'),
      clickable: true,
    },
    {
      eventKey: 'paymentPage',
      match: useRouteMatch({ path: routes.paymentPage, strict: true }),
      title: t('navigation:payment_page'),
      clickable: false,
    },
    {
      eventKey: 'confirmationPage',
      match: useRouteMatch({ path: routes.confirmationPage, strict: true }),
      title: t('navigation:confirmation_page'),
      clickable: false,
    },
  ];

  const matchingRouteIndex = navRoutes.findIndex((route) => route.match?.isExact);
  const matchingRoute = navRoutes[matchingRouteIndex];

  const handleSelect = useCallback((routeKey) => {
    const redirectPath = buildPath(history.location.search, routes[routeKey], { channelId });

    history.push(redirectPath);
  }, [history, channelId]);

  return (
    <Nav
      activeKey={matchingRoute.eventKey}
      variant="pills"
      className={styles.navigation}
      onSelect={handleSelect}
    >
      {navRoutes.map((route, index) => {
        const isAfterActive = index > matchingRouteIndex;
        const isOnConfirmationPage = matchingRoute.eventKey === 'confirmationPage';
        const disabled = isAfterActive || isOnConfirmationPage;

        return (
          <NavItem
            key={route.eventKey}
            eventKey={route.eventKey}
            disabled={disabled}
          >
            {route.title}
          </NavItem>
        );
      })}
    </Nav>
  );
}
