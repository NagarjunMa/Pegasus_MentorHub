#### Video uploaded to repository

## <b> Team Details - Pegasus ##

<table>
    <thead>
      <tr>
        <th>Name</th>
        <th>NUID</th>
      </tr>
    </thead>
    <tbody>
         <tr>
            <td>Apoorva Kulkarni</td>
            <td>002794526</td>
        </tr>
          <tr>
            <td>Arjun Raja Yogidas</td>
            <td>002964082</td>
        </tr>
          <tr>
            <td>Manoj Chandrashekaran</td>
            <td>002767647</td>
        </tr>
         </tr>
          <tr>
            <td>Nagarjun Mallesh</td>
            <td>002788601</td>
        </tr>
    </tbody>
</table>



## <b> Repository for MentorHub web application </b> ##

<b> Demo Video Link </b> : 
<a href="https://northeastern.sharepoint.com/sites/WebDevProject568/_layouts/15/stream.aspx?id=%2Fsites%2FWebDevProject568%2FShared%20Documents%2FGeneral%2FSequence%2001%2Emp4&referrer=Teams%2ETEAMS%2DELECTRON&referrerScenario=teams%2Dchiclet" target="_blank">MentorHub</a>

<b> Backend Repository </b> : 
<a href="https://github.com/neu-mis-info6150-fall-2022/mentorHub-BE" target="_blank">mentorHub-BE</a>

### How to run ###
For front end NextJs application do the following 
- ``` frontend - cd nextFrontend/ ```
- ``` npm i ```
- ```npm run dev ```


The suggested way of running the backend code is to clone the 
<a href="https://github.com/neu-mis-info6150-fall-2022/mentorHub-BE" target="_blank">backend repository</a>

- create a .env file in the root directory with the following data

```
AT_SECRET="AccessTokenSalt123"
RT_SECRET="RefereshTokenSalt123"
FP_SECRET="ForgotPasswordSalt123"
MAIL_HOST="smtp.mailtrap.io"
MAIL_USER="72804e0f651465"
MAIL_PASSWORD="1dd08da0e0828b"
MAIL_FROM="MentorHub@NU.edu"
MAIL_PORT="2525"
MAIL_TRANSPORT=smtp://${MAIL_USER}:${MAIL_PASSWORD}@${MAIL_HOST}
DB_URI="mongodb+srv://coderbirju:Isxep3KnI5tVue1Q@info6150.nz7c9vi.mongodb.net/pegasus?retryWrites=true&w=majority"

```
and then run the following commands
- ``` npm i ```
- ``` npm run start:dev ```

the backend code is also available in this repo inside the ```/backend``` folder



### 1. Objective
To provide a platform that connects NU Students with a career mentor of their choice. Allow them to schedule meetings and consume industry specific content that their mentors publish on the common feed

### 2. User Stories
- We'll have two types of users - Mentor, Mentee 
- All users should be able to Login/SignUp 
- Create and Update Profiles
- Mentor - Can List and view all their assigned Mentees
    - Can Schedule meetings
    - Provide FeedBack
- Mentee - Can Schedule Meetings
    - Ask for a change in mentorship
    - May have multiple mentors (This is complicated and will be done if we have time and motivation)
    - Provide FeedBack

### 3. Domain Diagram
![Domain Diagram](DomainDiagram.png?raw=true "Page view")


### Git Practices

- Use ssh for cloning the git repository, using https may lead to access issues later
- Git clone: 
    ``` git clone <repository name> ```

- Branching stratergy
    - We use ```main``` as our primary branch, the final working code should always be in main
    - ```main``` should always have the updated working code at all times
    - All development needs to happen on a branch made from the ``` main ``` branch
    - ``` git checkout -b <branchname>```

- Branch Naming suggestions
    - Name your branch meaningfully, add your name at the end as well
    - example ``` login_feature_Arjun ```
    - make multiple commits as and when you feel that you have some working code, this is also important to show individual contributions in the git history
    - ``` git add . ``` 
    - ``` git commit -m "some message" ```
    - Create a pull request against the main branch, once it is merged to main delete the merged branch
    - do not use the same branch again for a new feature, use a new branch
    - before creating as new branch always make sure your local main branch is updated using 



### API end points:

#### ``` /user ```
- ``` /user/interests ```
- ``` /user/suggestedMentors ```
- ``` /user/addMentors ```
- ``` /user/mentorAvailabilty ```
- ``` /user/everything ```
- ``` /user, POST ```
- ``` /user, PATCH ```
- ``` /user/mentors, GET ```
- ``` /user/slotAvailability, GET ```
- ``` /user, GET ```
- ``` /user/:id, GET ```
- ``` /user/:id, PATCH ```
- ``` /user/:id, DELETE ```

#### ``` /auth ```
- ``` /auth/local/signin, POST ```
- ``` /auth/forgot-password, POST ```
- ``` /auth/logout, POST ```
- ``` /auth/refresh, POST ```

#### ```/articles ```
- ``` /articles, POST ```
- ```/articles/mentee, GET ```
- ``` /articles/:id, GET ```
- ```/articles, GET ```
- ```/articles/:id, PATCH ```
- ```/articles/:id, DELETE ```




