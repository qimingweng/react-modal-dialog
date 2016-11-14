import {create} from 'jss';
import {create as createInjectSheet} from 'react-jss';
import jssDefaultUnit from 'jss-default-unit';
import jssCamelCase from 'jss-camel-case';
import jssNested from 'jss-nested';
import jssVendorPrefixer from 'jss-vendor-prefixer';

const jss = create();
if (typeof window !== 'undefined') {
  jss.use(jssVendorPrefixer());
}
jss.use(jssDefaultUnit());
jss.use(jssCamelCase());
jss.use(jssNested());

export default createInjectSheet(jss);
