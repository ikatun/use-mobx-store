import 'reflect-metadata';
import React from 'react';
import { Container } from 'inversify';
export declare const UseStoreContext: React.Context<Container | undefined>;
export declare const UseStoreProvider: ({ children }: {
    children: any;
}) => JSX.Element;
