// @flow

/**
 * Copyright (c) Garuda Labs, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as Namespaces from 'hyperview/src/services/namespaces';
import { ActivityIndicator, StyleSheet } from 'react-native';
import React, { PureComponent } from 'react';
import type { HvComponentProps } from 'hyperview/src/types';
import { LOCAL_NAME } from 'hyperview/src/types';
import WebView from 'react-native-webview';
import { createProps } from 'hyperview/src/services';

const NOOP = () => {};

export default class HvWebView extends PureComponent<HvComponentProps> {
  static namespaceURI = Namespaces.HYPERVIEW;
  static localName = LOCAL_NAME.WEB_VIEW;
  static localNameAliases = [];
  props: HvComponentProps;
  render() {
    const props: any = createProps(
      this.props.element,
      this.props.stylesheets,
      this.props.options,
    );
    const color = props['activity-indicator-color'];
    const injectedJavaScript = props['injected-java-script'];
    const source = { uri: props.url, html: props.html };
    return (
      <WebView
        injectedJavaScript={injectedJavaScript}
        onMessage={NOOP} // https://github.com/react-native-community/react-native-webview/issues/1311
        renderLoading={() => (
          <ActivityIndicator
            color={color}
            style={StyleSheet.absoluteFillObject}
          />
        )}
        source={source}
        startInLoadingState
      />
    );
  }
}
