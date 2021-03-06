import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';

function mapStateToProps(state) {
  const { locale, messages } = state.locales;
  return { key: locale, locale: locale, messages };
}

export default connect(mapStateToProps)(IntlProvider);
