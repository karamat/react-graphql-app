"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Promise = require('bluebird');
var _ = require('lodash');
var fs = require('fs');
var fileName = 'data-sources/users.json';

var getUsers = exports.getUsers = function getUsers() {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function (err, data) {
      if (err) return reject(err);
      resolve(JSON.parse(data));
    });
  });
};

var getUser = exports.getUser = function getUser(user) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function (err, data) {
      if (err) return reject(err);
      var users = JSON.parse(data);
      resolve(_.find(users, function (u) {
        return u.id == user.id;
      }));
    });
  });
};

var createUser = exports.createUser = function createUser(user) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, 'utf-8', function (err, data) {
      var users = JSON.parse(data);
      var newUser = user;
      newUser.id = users.length + 1;
      users.push(newUser);
      fs.writeFile(fileName, JSON.stringify(users, null, 2), 'utf-8', function (err) {
        if (err) return reject(err);
        resolve(newUser);
      });
    });
  });
};

var updateUser = exports.updateUser = function updateUser(user) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, 'utf-8', function (err, data) {
      var users = JSON.parse(data);
      var updatedUser = _filter(users, function (a) {
        return a.id == user.id;
      });
      updatedUser = Object.assign({}, updatedUser, user);
      users = _.reject(users, function (a) {
        return a.id == user.id;
      });
      users.push(updatedUser);
      fs.writeFile(fileName, JSON.stringify(users, null, 2), 'utf-8', function (err) {
        if (err) return reject(err);
        resolve(updatedUser);
      });
    });
  });
};

var deleteUser = exports.deleteUser = function deleteUser(user) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, 'utf-8', function (err, data) {
      var users = JSON.parse(data);
      users = _.reject(users, function (a) {
        return a.id == user.id;
      });
      fs.writeFile(fileName, JSON.stringify(users, null, 2), 'utf-8', function (err) {
        if (err) return reject(err);
        resolve();
      });
    });
  });
};