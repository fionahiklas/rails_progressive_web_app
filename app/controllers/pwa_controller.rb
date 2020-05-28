class PwaController < ApplicationController
  protect_from_forgery except: :serviceworker

  def main
  end

  def login
  end

  def login_offline
  end
  
  def token
  end

  def serviceworker
    respond_to do |format|
      format.js {
        logger.debug("Returning service worker from remplate")
        render :template => "pwa/serviceworker.js.erb", :content_type => "application/javascript"
      }
    end
  end
  
end
