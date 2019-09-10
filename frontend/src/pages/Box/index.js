import React, { Component } from 'react';
import { MdInsertDriveFile } from 'react-icons/md';
import { formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '../../services/api';
import logo from '../../assets/logo.svg';
import './styles.css';


export default class Box extends Component {
  state = { box: {} }
  async componentDidMount() {
    const box = this.props.match.params.id;
    const response = await api.get(`boxes/${box}`);

    this.setState({ box: response.data })
  }
  render() {
    return (
      <div id="box-container">
        <header>
          <img src={logo} alt="logo" />
          <h1>{this.state.box.title}</h1>
        </header>
        <ul>
          {this.state.box.files && this.state.box.files.map(file => (
            <li>
              <a className="fileInfo" href={file.url} target="_blank">
                <MdInsertDriveFile size={24} color="#A5CFFF" />
                <strong>{file.title}</strong>
              </a>
              <span>
                {formatDistance(new Date(file.createdAt), new Date(),
                  {
                    locale: pt,
                    addSuffix: true
                  }
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
