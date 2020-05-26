class PwaController < ApplicationController
  def main
  end

  def login
  end

  def token
  end

  def serviceworker
    respond_to do |format|
      format.js {
        logger.debug("Returning service worker from remplate")
      }
    end
  end
  
end
