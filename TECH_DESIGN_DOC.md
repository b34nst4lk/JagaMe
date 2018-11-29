# Tech Design

This document provides an overview and rationale for the app's design, and discusses the improvements that can be made.

## File structure

```bash
- root
    - pages # All screens and components go here
    - state # Contains all state management code
        - action.js # Constants representing actions used throughout the app
        - reducer.js # Contains initial state and reducers 
        - saga.js # Contains the middleware Redux Saga
        - store.js # binds the middleware and reducers together and initializes the store
    - App.js # Entry point of application
    - config.js # Contains endpoints that will be called
```

## App Design

### UI Components

All UI components are functional class components unless lifecycle methods are required. Each component interacts directly with the store, and updates other components by dispatching the appropriate actions to update the application state.

The current design makes it pretty easy to reason about how a component should be visually updated given some change in other parts of the application. 

However, as it stands, components are not easy to reuse as they are tied to specific state changes. An improvement would be to track which components are being reused elsewhere, refactor these components by removing their interactions with the state, and passing data from the parent components through props.

### State Management

State management is done using Redux and Redux Saga. Currently, all UI related state, retrieved data from search, and user-provided data reside in the same store. Trying to navigate and figure out state changes is currently challenging. An immediate improvement is probably to group the state into 3 parts: cart, catalog, and cached data.

Currently, the states of several components are based on boolean flags in the store. Increasing the number of components will just cause the number of flags to go up. An  improvement would be to chart out the various states the application can be in first, and map how each component should behave based on the defined state. Useful link [here](https://www.slideshare.net/lmatteis/are-statecharts-the-next-big-ui-paradigm)

### Data

#### Search Results

The Redux store also acts as a cache for previously searched data in the Catalog page. When a search result is received, only the required data are stored in the following shape:

```json
{
    id : {
        id: number,
        name: string,
        description: string,
        short_description: string,
        price: number,
        imageUrl: string
    }, 
    ...
}
```

If the same object is retrieved through search again, the data will be updated without duplication. The cached data is later used in the Cart page

### Submission

Submission data is provided in the following shape:

```json
{
    patiendId: string,
    cart: [
        {
            item: number, // item's id
            price: number,
            quantity: number
        }
    ]
}
```

The data submitted is the minimum amount of information that is needed to provide an employee following up on the case. Item Id allows fetching of data from the products service, price lets the employee knows what price was previously quoted to the client, and the quantity records the actual amount required.