"use strict";
const Promise = require('bluebird');
const _ = require('lodash');
const fs = require('fs');
const fileName = `data-sources/users.json`;

export const getUsers = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, data) => {
      if (err) return reject(err);
      resolve(JSON.parse(data));
    });
  })  
}

export const getUser = (user) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, data) => {
      if (err) return reject(err);
      const users = JSON.parse(data)
      resolve(_.find(users, u => u.id == user.id));
    })
  })  
}

export const createUser = (user) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf-8', (err, data) => {
      let users = JSON.parse(data);
      let newUser = user;
      newUser.id = users.length + 1;
      users.push(newUser);
      fs.writeFile(fileName, JSON.stringify(users, null, 2), 'utf-8', err => {
        if (err) return reject(err);
        resolve(newUser);
      });
    });
  });
}

export const updateUser = (user) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf-8', (err, data) => {
      let users = JSON.parse(data);
      let updatedUser = _filter(users, (a) => a.id == user.id);
      updatedUser = Object.assign({}, updatedUser, user);
      users = _.reject(users, (a) => a.id == user.id);
      users.push(updatedUser);
      fs.writeFile(fileName, JSON.stringify(users, null, 2), 'utf-8', err => {
        if (err) return reject(err);
        resolve(updatedUser);
      });
    });
  });
}

export const deleteUser = (user) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf-8',(err, data) => {
      let users = JSON.parse(data);
      users = _.reject(users, (a) => a.id == user.id);
      fs.writeFile(fileName, JSON.stringify(users, null, 2), 'utf-8', err => {
        if (err) return reject(err);
        resolve();
      });
    });
  });
}