<!-- @format -->

<!-- Media App -->

### The entire goal of this application is to understand making network requests in genral fetching data in Redux World

- Users comes to the app , we are going to make a network request to outside API and fetch a list of users and show them on the screen.
- when we click on button we will do a network request to create new user , (randomly genrated name)
- on left side we have delete button for deleting user,
- on right side we have expander there we have list of photo albums created by user, on left side we have delete button and on right we have albums expansion button and inside album we have collection of new phote
- we have create new album button
- inside album we have photos and add new photo button.
- All the data is randomly genrated , but we are going to save it to oustside API, so we can fetch randomly genrated data in some point in the future.
- All of our data will be stored on oustside JSON Server
- on our server we are going to have a list of users , albums , photos
- then we are going to make req to fetch those lists and store them inside Redux store
- once they are inside store, we are going to access that data for our components

### Few Things ...

#### we are going to assume the user is on bandwidth constrained connection. (mobille data , internet connection is littile bit spotty )

- This is going to have a really big imapct.
- whenever ouur application starts up we have to fetch some data and show it to the user
- there are couple of diffrent ways to load initial data
- Eager over fetching the data : at app startup, fetch all data we would ever need.
- Req to json server -> asking for all data -> json server
- Client <- send all the data <- json server
- pros: dont have to make another requests
- Downside : if serever has a lot of data ,we will recive a loat of data
- not good for spotty internet connection

---

##### Middle ground:

- we could ask 1st 10 users or the most recent 10 users and all related data, still fetching alot of data that we actually need

---

### Lazy fetching

- only fetching data as it actually needed displayed on the screen
- only fetch the data immidetly before it is needed
- app start we are going to make a single req that ask for minimum amount of data possible
- just ask list of users and we will show to user
- user click on any user we need to show list of albums to user, we will make a follow up request to fetch a list of albums that particular user make
- user click on albums to see photos we will make another followup request to get all of the photos for that particular album

#### Data loading experience must be nearly perfect

- will add loader effect so user can feel the data loading

#### we are going to first look at data fetching with plai RTK(THUNKS) for users. and then use RTK QUERY for albums and photos
