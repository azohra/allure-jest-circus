# Allure Jest circus

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Build Status](https://travis-ci.com/azohra/allure-jest-circus.svg?branch=master)](https://travis-ci.com/azohra/allure-jest-circus)

## About

Allure-jest-circus is a custom jest environment built on top of `jest-environment-node` designed to create allure reports for test suites run with jest-circus. It takes advantage of jest-circus test events to provide detailed reporting for your test suites.

## Installation

Install the package:

`npm install allure-jest-circus`

Add to your jest config:

```
"jest": {
    ...
    "testEnvironment": "allure-jest-circus",
    ...
}
```
