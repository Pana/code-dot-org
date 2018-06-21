$LOAD_PATH.unshift File.expand_path('../../../../../lib', __FILE__)
require 'eyes_selenium'
require 'cdo/git_utils'
require 'open-uri'
require 'json'
require 'rinku'
require_relative '../../utils/selenium_constants'

# Override default match timeout (2 seconds) to help prevent laggy UI from breaking eyes tests.
# See http://support.applitools.com/customer/en/portal/articles/2099488-match-timeout
MATCH_TIMEOUT = 5

When(/^I open my eyes to test "([^"]*)"$/) do |test_name|
  next if CDO.disable_all_eyes_running
  ensure_eyes_available

  @original_browser = @browser
  config = {app_name: 'Code.org', test_name: test_name, driver: @browser}
  if @original_browser.capabilities.browser_name == 'chrome'
    config[:viewport_size] = {width: 1024, height: 690}
  end
  @browser.capabilities[:takes_screenshot] = true
  @eyes.force_full_page_screenshot = true
  @eyes.stitch_mode = :css
  @eyes.open(config)
end

And(/^I close my eyes$/) do
  next if CDO.disable_all_eyes_running

  @browser = @original_browser
  fail_on_mismatch = !CDO.ignore_eyes_mismatches
  begin
    @eyes.close(fail_on_mismatch)
  rescue Applitools::TestFailedError => e
    puts "<span style=\"color: red;\">#{EYES_ERROR_PREFIX} #{Rinku.auto_link(e.to_s)}</span>"
  end
end

And(/^I see no difference for "([^"]*)"$/) do |identifier|
  next if CDO.disable_all_eyes_running

  @eyes.check_window(identifier, MATCH_TIMEOUT)
end

def ensure_eyes_available
  return if @eyes
  puts "Applitools Batch ID - #{ENV['APPLITOOLS_BATCH_ID']}"
  puts "Git revision - #{GitUtils.git_revision}"
  @eyes = Applitools::Selenium::Eyes.new
  # Force eyes to use a consistent host OS identifier for now
  # BrowserStack was reporting Windows 6.0 and 6.1, causing different baselines
  @eyes.host_os = ENV['APPLITOOLS_HOST_OS']
end
