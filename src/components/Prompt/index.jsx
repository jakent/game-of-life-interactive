import React, {Component} from 'react';
import {connect} from 'react-redux';
import {submit} from '../../store'

import './prompt.scss'

export class Prompt extends Component {

  render() {
    const {game, submit} = this.props;

    return (
      <div className="prompt">
        <p>{game}</p>
        <button className="submit" onClick={submit}>Submit</button>
      </div>);
  }
}

const mapStateToProps = (store) => {
  return {
    game: store.game
  }
};
const mapDispatchToProps = {submit};
export default connect(mapStateToProps, mapDispatchToProps)(Prompt);