import React, { Component } from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as demoActions from '../actions/demoActions';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

class DemoView extends Component {
  static navigationOptions = {
    title: "Demo"
  }

  onButtonPress() {
    this.props.actions.addPost({index: this.props.posts.length, title: 'New post!'});
  }

  displayPosts() {
    return (
      <View>
        {this.props.posts.map((post) =>
          <Text key={post.index}>
            {post.title}
          </Text>
        )}
      </View>
    );
  }

  render() {
    const { params } = this.props.navigation.state;
    let posts;
    if (this.props.posts) {
      posts = this.displayPosts();
    }
    return (
      <View style={styles.container}>
        {posts}
        <Button
          title="Add Post"
          onPress={() => this.onButtonPress()}
        />
        <Text style={styles.welcome}>
          { params.title }
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

function mapStateToProps(state) {
  return {
    posts: state.demo.posts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(demoActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DemoView);
