import jssClass from 'jss';
import reactJss from 'react-jss';
import vendorPrefixer from 'jss-vendor-prefixer';
import jssPx from 'jss-px';
import jssCamelCase from 'jss-camel-case';
import jssNested from 'jss-nested';

const jss = jssClass.create();
jss.use(vendorPrefixer());
jss.use(jssPx());
jss.use(jssCamelCase());
jss.use(jssNested());

export default reactJss(jss);
