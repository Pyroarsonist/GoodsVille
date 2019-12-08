import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import bootstrap from 'bootstrap-css-only/css/bootstrap.min.css';
import datepicker from 'react-datepicker/dist/react-datepicker.min.css';
import fontawesome from '@fortawesome/fontawesome-free/css/all.min.css';
import { withSnackbar } from 'notistack';
import { compose } from 'redux';
import { useQuery, useMutation } from 'react-apollo';

import notificationsQuery from './notifications.graphql';
import shutNotificationMutation from './shutNotification.graphql';
import s from './index.scss';
import Header from '../Header';
import Footer from '../Footer';

const notificationVariantResolver = level => {
  const permittedVariants = ['info', 'warning', 'error', 'success'];
  if (!permittedVariants.includes(level)) return 'default';
  return level;
};

function Layout({ children, enqueueSnackbar, closeSnackbar }) {
  const [shutNotification] = useMutation(shutNotificationMutation, {
    update(
      cache,
      {
        data: { shutNotification: notifications },
      },
    ) {
      try {
        cache.writeQuery({
          query: notificationsQuery,
          data: { notifications },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });
  const { data } = useQuery(notificationsQuery, {
    pollInterval: 60 * 1000,
  });
  const notifications = data?.notifications || [];
  notifications.forEach(notification => {
    enqueueSnackbar(notification.message, {
      preventDuplicate: true,
      key: notification.id,
      persist: true,
      variant: notificationVariantResolver(notification.level),
      action: key => (
        <button
          type="button"
          className="btn"
          style={{ backgroundColor: 'rgb(236, 236, 236)' }}
          onClick={async () => {
            try {
              closeSnackbar(key);
              await shutNotification({ variables: { id: key } });
            } catch (e) {
              console.error(e);
            }
          }}
        >
          Shut
        </button>
      ),
    });
  });

  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  closeSnackbar: PropTypes.func.isRequired,
};

export default compose(
  withStyles(bootstrap, fontawesome, datepicker, s),
  withSnackbar,
)(Layout);
