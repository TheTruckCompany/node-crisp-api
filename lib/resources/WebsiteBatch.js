/*
 * node-crisp-api
 *
 * Copyright 2021, Crisp IM SARL
 * Author: Valerian Saliou <valerian@valeriansaliou.name>
 */


"use strict";


/**
 * Crisp WebsiteBatch Resource
 * @class
 * @classdesc This is the Crisp Website Batch Resource
 */
function WebsiteBatch(crisp) {
  /**
   * Batch Resolve Conversations
   * @memberof WebsiteBatch
   * @method batchResolveConversations
   * @return Promise
   */
  this.batchResolveConversations = function(websiteID, sessions) {
    return crisp.patch(
      crisp._prepareRestUrl(["TODO"]), null,

      {
        // TODO
      }
    );
  };

  /**
   * Batch Read Conversations
   * @memberof WebsiteBatch
   * @method batchReadConversations
   * @return Promise
   */
  this.batchReadConversations = function(websiteID, sessions) {
    return crisp.patch(
      crisp._prepareRestUrl(["TODO"]), null,

      {
        // TODO
      }
    );
  };

  /**
   * Batch Remove Conversations
   * @memberof WebsiteBatch
   * @method batchRemoveConversations
   * @return Promise
   */
  this.batchRemoveConversations = function(websiteID, sessions) {
    return crisp.patch(
      crisp._prepareRestUrl(["TODO"]), null,

      {
        // TODO
      }
    );
  };

  /**
   * Batch Remove People
   * @memberof WebsiteBatch
   * @method batchRemovePeople
   * @return Promise
   */
  this.batchRemovePeople = function(websiteID, people) {
    return crisp.patch(
      crisp._prepareRestUrl(["TODO"]), null,

      {
        // TODO
      }
    );
  };
}


module.exports = WebsiteBatch;