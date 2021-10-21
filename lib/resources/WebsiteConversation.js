/*
 * node-crisp-api
 *
 * Copyright 2021, Crisp IM SARL
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */


"use strict";


var util = require("util");


/**
 * Crisp WebsiteConversation Resource
 * @class
 * @classdesc This is the Crisp Website Conversations Resource
 */
function WebsiteConversation(crisp) {
  this.FIND_WITH_SEARCH_QUERY_PARAMETERS = [
    ["searchQuery", "search_query"],
    ["searchType", "search_type"],
    ["searchOperator", "search_operator"],
    ["includeEmpty", "include_empty"],
    ["filterUnread", "filter_unread"],
    ["filterResolved", "filter_resolved"],
    ["filterNotResolved", "filter_not_resolved"],
    ["filterMention", "filter_mention"],
    ["filterAssigned", "filter_assigned"],
    ["filterUnassigned", "filter_unassigned"],
    ["filterDateStart", "filter_date_start"],
    ["filterDateEnd", "filter_date_end"],
    ["orderDateCreated", "order_date_created"],
    ["orderDateUpdated", "order_date_updated"]
  ];

  this.SET_STATE_STATES = ["resolved", "unresolved", "pending"];

  /**
   * Find conversations given search
   * @memberof WebsiteConversation
   * @method findWithSearch
   * @return Promise
   */
  this.findWithSearch = function(websiteId, page, searchParams) {
    var query = {};

    if (!searchParams) {
      searchParams = {};
    }

    if (!page) {
      page = 1;
    }

    this.FIND_WITH_SEARCH_QUERY_PARAMETERS.forEach((parameter) => {
      var parameterValue = searchParams[parameter[0]];

      if (parameterValue) {
        query[parameter[1]] = parameterValue;
      }
    });

    return crisp.get(
      crisp._prepareRestUrl(["website", websiteId, "conversations", page]),

      query
    );
  };

  /**
   * Get website conversations
   * @memberof WebsiteConversation
   * @method getList
   * @return Promise
   */
  this.getList = function(websiteId, page) {
    return this.findWithSearch(websiteId, page);
  };

  /**
   * Get website conversations
   * @memberof WebsiteConversation
   * @method getOne
   * @return Promise
   */
  this.getOne = function(websiteId, sessionId) {
    return crisp.get(
      crisp._prepareRestUrl(["website", websiteId, "conversation", sessionId]),

      {}
    );
  };

  /**
   * Create a website conversation
   * @memberof WebsiteConversation
   * @method create
   * @return Promise
   */
  this.create = function(websiteId) {
    return crisp.post(
      crisp._prepareRestUrl(["website", websiteId, "conversation"]), {}
    );
  };

  /**
   * Initiate website conversations
   * @memberof WebsiteConversation
   * @method getOne
   * @return Promise
   */
  this.initiateOne = function(websiteId, sessionId) {
    return crisp.post(
      crisp._prepareRestUrl([
        "website", websiteId, "conversation", sessionId, "initiate"
      ]),

      {}
    );
  };

  /**
   * Send a message
   * @memberof WebsiteConversation
   * @method sendTextMessage
   * @return Promise
   */
  this.sendMessage = function(websiteId, sessionId, message) {
    return crisp.post(
      crisp._prepareRestUrl([
        "website", websiteId, "conversation", sessionId, "message"
      ]),

      null, message
    );
  };

  /**
   * Compose message
   * @memberof WebsiteConversation
   * @method composeMessage
   * @return Promise
   */
  this.composeMessage = function(websiteId, sessionId, data) {
    return crisp.patch(
      crisp._prepareRestUrl([
        "website", websiteId, "conversation", sessionId, "compose"
      ]),

      null, data
    );
  };

  /**
   * Set conversation state (resolved, pending, unresolved)
   * @memberof WebsiteConversation
   * @method setState
   * @return Promise
   */
  this.setState = function(websiteId, sessionId, state) {
    if (this.SET_STATE_STATES.indexOf(state) === -1) {
      throw new Error("WebsiteConversation, setState: state if not valid");
    }

    return crisp.patch(
      crisp._prepareRestUrl([
        "website", websiteId, "conversation", sessionId, "state"
      ]),

      null,

      {
        state : state
      }
    );
  };

  /**
   * Get conversation routing assign
   * @memberof WebsiteConversation
   * @method getMeta
   * @return Promise
   */
  this.getRouting = function(websiteId, sessionId) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteId, "conversation", sessionId, "routing"
      ]),

      {}
    );
  };

  /**
   * Set conversation routing assign
   * @memberof WebsiteConversation
   * @method setNickname
   * @return Promise
   */
  this.setRouting = function(websiteId, sessionId, assign) {
    return crisp.patch(
      crisp._prepareRestUrl([
        "website", websiteId, "conversation", sessionId, "routing"
      ]),

      null, assign
    );
  };

  /**
   * Get conversation meta
   * @memberof WebsiteConversation
   * @method getMeta
   * @return Promise
   */
  this.getMeta = function(websiteId, sessionId) {
    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteId, "conversation", sessionId, "meta"
      ]),

      {}
    );
  };

  /**
   * Get conversation messages
   * @memberof WebsiteConversation
   * @method getMessages
   * @return Promise
   */
  this.getMessages = function(websiteId, sessionId, timestampBefore) {
    var query = {};

    if (timestampBefore) {
      query.timestamp_before = timestampBefore;
    }

    return crisp.get(
      crisp._prepareRestUrl([
        "website", websiteId, "conversation", sessionId, "messages"
      ]),

      query
    );
  };

  /**
   * Update conversation meta
   * @memberof WebsiteConversation
   * @method updateMeta
   * @return Promise
   */
  this.updateMeta = function(websiteId, sessionId, update) {
    return crisp.patch(
      crisp._prepareRestUrl([
        "website", websiteId, "conversation", sessionId, "meta"
      ]),

      null, update
    );
  };


  /**
   * Set conversation block
   * @memberof WebsiteConversation
   * @method setBlock
   * @return Promise
   */
  this.setBlock = function(websiteId, sessionId, block) {
    return crisp.patch(
      crisp._prepareRestUrl([
        "website", websiteId, "conversation", sessionId, "block"
      ]),

      null,

      {
        blocked : block
      }
    );
  };

  /**
   * Remove conversation
   * @memberof WebsiteConversation
   * @method deleteOne
   * @return Promise
   */
  this.deleteOne = function(websiteId, sessionId) {
    return crisp.delete(
      crisp._prepareRestUrl([
        "website", websiteId, "conversation", sessionId
      ])
    );
  };

  /**
   * Mark messages as delivered
   * @memberof WebsiteConversation
   * @method deliveredMessages
   * @return Promise
   */
  this.deliveredMessages = function(websiteId, sessionId, from, origin, fingerprints) {
    return crisp.patch(
      crisp._prepareRestUrl([
        "website", websiteId, "conversation", sessionId, "delivered"
      ]),

      null,

      {
        origin       : origin,
        from         : from,
        fingerprints : fingerprints
      }
    );
  };

  /**
   * Mark messages as read
   * @memberof WebsiteConversation
   * @method readMessages
   * @return Promise
   */
  this.readMessages = function(websiteId, sessionId, from, origin, fingerprints) {
    return crisp.patch(
      crisp._prepareRestUrl([
        "website", websiteId, "conversation", sessionId, "read"
      ]),

      null,

      {
        origin       : origin,
        from         : from,
        fingerprints : fingerprints
      }
    );
  };

  // For backwards compatibility
  this.composeMessages     = this.composeMessage;
  this.acknowledgeMessages = this.readMessages;
}


module.exports = WebsiteConversation;