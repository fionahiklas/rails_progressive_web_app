require 'test_helper'

class PwaControllerTest < ActionDispatch::IntegrationTest
  test "should get main" do
    get pwa_main_url
    assert_response :success
  end

  test "should get login" do
    get pwa_login_url
    assert_response :success
  end

  test "should get token" do
    get pwa_token_url
    assert_response :success
  end

end
