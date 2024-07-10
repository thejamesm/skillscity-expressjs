# July 10th exercise

In the interest of using HTTP `PUT` and `DELETE`, I've taken a different
approach than I might have otherwise.

Since HTML forms only support the methods `GET` and `POST`, I've used `fetch()`
to generate these other types of HTTP request. This means that the lower form
has no `action` or `method`, and no submit button.

I've also used different approaches for passing the data to the server.
`/update` passes its data as JSON in the body, while `/delete` passes it as a
URI component. I would think that normally it would be a better idea to use a
consistent method across a project where possible, but in this instance it
seemed like a good idea to try them both so I could get a sense for how each
works.

From a UI perspective it would be more elegant to have the edit button
replace the respective line with form elements in-situ, so you could edit the
details without moving to a different part of the page. However, this would
ideally be achieved with something like React, which we haven't learnt, so I
decided to keep things relatively simple for this exercise.
