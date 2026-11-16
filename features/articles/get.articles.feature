Feature: As a visitor I can read blog articles

  Scenario: I see all articles ordered from newest to oldest
    Given I use seed data
    When I send a "GET" request to "/api/v1/articles"
    Then the response status should be 200
    And the response body should contain:
      """
      [
        {
          "id": "33333333-3333-4333-8333-333333333333",
          "title": "Working with Prisma",
          "content": "Prisma makes working with databases easier.",
          "publishedAt": "2026-03-20T14:00:00.000Z"
        },
        {
          "id": "22222222-2222-4222-8222-222222222222",
          "title": "Learning NestJS",
          "content": "I am learning how to build APIs with NestJS.",
          "publishedAt": "2026-02-15T12:00:00.000Z"
        },
        {
          "id": "11111111-1111-4111-8111-111111111111",
          "title": "My First Article",
          "content": "This is my first blog article.",
          "publishedAt": "2026-01-10T10:00:00.000Z"
        }
      ]
      """

  Scenario: I see articles with the same publication date in stable order
    Given I use seed data
    And two articles have the same publication date
    When I send a "GET" request to "/api/v1/articles"
    Then the response status should be 200
    And the response body should contain:
      """
      [
        {
          "id": "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
          "title": "Tie breaker A",
          "content": "First article with the same date.",
          "publishedAt": "2026-04-01T10:00:00.000Z"
        },
        {
          "id": "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
          "title": "Tie breaker B",
          "content": "Second article with the same date.",
          "publishedAt": "2026-04-01T10:00:00.000Z"
        },
        {
          "id": "33333333-3333-4333-8333-333333333333",
          "title": "Working with Prisma",
          "content": "Prisma makes working with databases easier.",
          "publishedAt": "2026-03-20T14:00:00.000Z"
        },
        {
          "id": "22222222-2222-4222-8222-222222222222",
          "title": "Learning NestJS",
          "content": "I am learning how to build APIs with NestJS.",
          "publishedAt": "2026-02-15T12:00:00.000Z"
        },
        {
          "id": "11111111-1111-4111-8111-111111111111",
          "title": "My First Article",
          "content": "This is my first blog article.",
          "publishedAt": "2026-01-10T10:00:00.000Z"
        }
      ]
      """

  Scenario: I see an empty list when there are no articles
    Given I use seed data
    And I have no articles
    When I send a "GET" request to "/api/v1/articles"
    Then the response status should be 200
    And the response body should contain:
      """
      []
      """

  Scenario: I see an article by its ID
    Given I use seed data
    When I send a "GET" request to "/api/v1/articles/11111111-1111-4111-8111-111111111111"
    Then the response status should be 200
    And the response body should contain:
      """
      {
        "id": "11111111-1111-4111-8111-111111111111",
        "title": "My First Article",
        "content": "This is my first blog article.",
        "publishedAt": "2026-01-10T10:00:00.000Z"
      }
      """

  Scenario: I receive not found when an article does not exist
    Given I use seed data
    When I send a "GET" request to "/api/v1/articles/99999999-9999-4999-8999-999999999999"
    Then the response status should be 404
    And the response body should contain:
      """
      {
        "message": "Article with id 99999999-9999-4999-8999-999999999999 not found",
        "error": "Not Found",
        "statusCode": 404
      }
      """

  Scenario: I receive bad request when an article ID is invalid
    When I send a "GET" request to "/api/v1/articles/abc"
    Then the response status should be 400

  Scenario: I see no duplicate articles after running the seed process multiple times
    Given I use seed data
    When I run the seed process again
    And I send a "GET" request to "/api/v1/articles"
    Then the response status should be 200
    And the response body should contain 3 articles
