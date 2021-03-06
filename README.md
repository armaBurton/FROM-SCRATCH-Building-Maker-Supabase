| User should be able to . . .                                                         |             |
| :----------------------------------------------------------------------------------- | ----------: |
| Visit the deployed pages on GitHub pages, with link in the About section of the Github repo |    1 |

| Events                                                                                |             |
| :----------------------------------------------------------------------------------- | ----------: |
| On the home page (`'/'`), Login and Signup using the login and signup form. On success, redirect to the `/city` page   |        1 |
| If a non-logged-in user tries to visit the city page, redirect them to the login page | 1 |
| On the city page load, fetch the city from supabase and render their details (including all slogans) to the page  |        2 |
| On the city page load, if a city does not exist for this user, create one  |        2 |
| On change of the dropdown, update the city in supabase. Then update the UI to show the right image |     2 |
| On click of the name change button, update the city name in supabase. Then update the UI to show the right name |     2 |
| On click of the slogan button, update the city's slogans in supabase. This means you will fetch the old city's slogans, push the new slogan to these old slogans, and send the mutated array to your `updateSlogans` function |     2 |

| Functions                                                                                |             |
| :----------------------------------------------------------------------------------- | ----------: |
| IMPURE: `displayCity(city)` : Takes in a city and displays the images and slogans on the DOM | 1 |
| ASYNC: `fetchCity()` : fetches city for currently logged in user from supabase | 1 |
| ASYNC: `updateName(newName)` : updates name of city for currently logged in user from supabase | 1
| ASYNC: `updateWaterfront(newWaterfront)` : updates waterfront id of city for currently logged in user from supabase | 1
| ASYNC: `updateSkyline(newSkyline)` : updates skyline id of city for currently logged in user from supabase | 1
| ASYNC: `updateCastle(newCastle)` : updates castle id of city for currently logged in user from supabase | 1
| ASYNC: `updateSlogans(newSlogans)` : updates slogans of character for currently logged in user from supabase | 1 |


## Stretch goal ideas:
1) Give your city more features. Maybe there's a song that goes along with your city that plays in the background, as well as a population, a mayor, etc.
2) What if your city had an official youtube video that users could link to? Let users submit a link to a youtube video, and display that video on screen. As a challenge, can you get the video to play as the literal CSS background? Wouldn't that be something? (a quick googling will be helpful here).
3) Let the user delete their city and start over with a fresh one. Look up the `delete` method in the supabase docs to work through this.
4) Let a user create multiple cities! Use a list/detail model. List all cities in the `cities` page, and move the "view city" work to `/city/?id=7`, which will let the user update that particular city (that is, city with id of 7) in the same way as the base deliverable.

## HTML Setup
- 'destination' elements for
  - slogans array
  - waterfront picture
  - skyline picture
  - castle picture
- event elements
  - city name input and button
  - slogan input and button
  - water dropdown
  - skyline dropdown
  - castle dropdown

## Events
- on load
  - problem: new user has no city
    - check to see if this user has a city already (try to fetch it from supabase--if it's null, create a new one and load that)
      - if they do, display that city
      - if they do not have a city create a new, default city for them and display it  
- city name input and button
  - on click 
    - update the name column for this city in the database 
    - fresh fetch
    - display "Welcome to beautiful <city name>"
- slogan input and button
  - on click (pessimistic loading)
    - update the slogan column for this city in the database with the new slogan
    - fetch the slogans again
    - render and append all slogans
- water dropdown
    - update the water_id column for this city in the database 
    - fresh fetch
    - display the water picture correctly
- skyline dropdown
    - update the skyline_id column for this city in the database 
    - fresh fetch
    - display the skyline picture correctly
- castle dropdown
    - update the castle_id column for this city in the database 
    - fresh fetch
    - display the castle picture correctly