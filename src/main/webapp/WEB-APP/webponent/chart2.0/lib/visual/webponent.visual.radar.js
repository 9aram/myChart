

(function () {

    var CONST_SVG_URL = 'http://www.w3.org/2000/svg';
    var VML_NAME_SPACE = 'urn:schemas-microsoft-com:vml'
    var CONST_MAX_RADIUS = 100;
    var CONST_DECREMENT = 20;
    var productName = 'webPonent CHART 2.0';
    var productId = 'WC2';

    if (typeof WEBPONENT_CHART_LICENSE_KEY === 'undefined') {

        $.ajax({
            url: '/webponent.licenseKey.js',
            dataType: 'script',
            async: false
        });

        if (typeof WEBPONENT_CHART_LICENSE_KEY === 'undefined' || WEBPONENT_CHART_LICENSE_KEY === '') {

            alert(productName + '의 라이센스키를 입력해주세요.');
            return;

        }
    }

    var key = "SXGWLZPDOKFIVUHJYTQBNMACERxswgzldpkoifuvjhtybqmncare";

    function decodeStr(coded) {
        coded = decodeURIComponent(coded);
        var uncoded = "";
        var chr;
        for (var i = coded.length - 1; i >= 0; i--) {
            chr = coded.charAt(i);
            uncoded += (chr >= "a" && chr <= "z" || chr >= "A" && chr <= "Z") ?
                String.fromCharCode(65 + key.indexOf(chr) % 26) :
                chr;
        }
        return uncoded;
    }

    function appendTrialUi(wrapper) {

        wrapper = $(wrapper);

        var trialUiWrapper = $('<div class="WEBPONENT-TRIAL-UI">');

        trialUiWrapper.css({
            'position': 'absolute',
            'top': '0',
            'left': '0',
            'width': '100%',
            'height': '100%',
            'background-image': "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL8AAAAwCAYAAABADKsLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgapeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScsGQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAEHtJREFUeNrsnXt0VdWdxz83T14TCIK8pAKCkKGY1myfRUBNsdRqUXspaqd2UIKMGseODnQsXba2Y1JndBqXdoFoae1LruOI2jFKxtKXBXoCRUERIbwRIxAeAQTymD/275idnXPOPTf3htTkfte6697z2Pvss/d3//b399v7nBtpbm4mjTS6IzLSVZBGd0UWQLRiXbL5TAT+AbgMOFv2bQf+ADwD/DEVhY2VFqa8ApRSaRZ8guE4jl+7zgSmAweAHsAJ4EHHcfa0In8S+AzwH8CVHscK5FMC/B9wL/DXLt4Wi4ABwIPA2hTl2Rs4mqZ5QgbtPqABuNFxnGbZNwxYqJQqcRzn/WRkTz/gMeAvPsS3caWc+5ik7ao4E7gOWAV8IcG0A4BKYCNwUBqvGaiX793A/wKzxJKl4U38YcBox3EeBaYrpdYqpV4Wrt8FLGiv5o9I5W8C7kxw5MiSNJskj0gXboNsYIlY7bDoA1wFjAX6ApnW8aHANOApGUHHdFN+zwOuCeDu1cAvlVI5QAXwZWAxcIXjONuAv2uP7LkI+C/g4iQLP1AacDZwN7C6izbSIKAYWNYBeY8VKTkeONLNyD9X/Mo/AdeKprdH0N/K90HHcXYAO4zjDYlY/iFC1jdSQHwTFwN/lryHdNGGGpFk+n8CbgBuF7KbGA7ck4IynnuaR+G+YgCTxedkdLWxCTgPeB/IUErdrpRaopT6lhzPDUP+nsD9hkzpiLBohiGj7pdrdiUkS6ofA88DC2UUsRv7Kyko47tS/58/TXVyOVALvJwCo3eNaHwTvwG+IdLzi2IkVgP/qZS6BlgTT/ZcK87pp05ThfQBvi+RoTuBlxJ0cr4vDfiS4zh1HsdLgfNlc6PjOGU+I9w0sUrlxv4C4A50GPcMcUargScJF8IdCNwn5BogFul5kZAfJVhPT0jDuhjj4VfNAK4H/h7IA/aLA75ERm8vjBbSXCRRqutktBkPHJP7fAh4L8BQzpJ0o8VB3yb3uRg47qPNK4EiceDvkfRnAh8A/w08aqS9DR1SH2AbCKWUK33udRxnn1LqQeAXwALHce5XSuUCX5P0sz+2TM3NzWacP0dIX9LJFvNJ6QQnzZ1+cX6l1O+ASeiQ4ALx9M3j242OfBjIdxynSY5FZNT5jliLXwI3u5UJlHk4ny5+AHzb2H5BHCzTct8gDWrjLYmCfWhIpK1xRo7xwHpj+6QxjI8HYtJZ/fBTaVuzXs0p/p9I/dztkfYwcIV0fCzjsCzAAd8oHX+XbE8H/sc4fgvwLyJVbKwGJouRWCLnBmGkOLUopQbJvQ4Xnf+q4zjLbEvhIhN4VgrX2ZgtPTwKNIY4/zUhf2/gEaXUIcdxnpZKGGGNYHnABMDt8bej4/IuXpHvEuDhONe9X8j46wDnzA8TpKNNtQgYBFua7JbvYcDrPp0Mi2g9gJk+x79iRkMs5EnnmWCUdwBQJZEoP4wDlopGb/YZzfyiYhcC/wp8L1ECOY7zgdWunprbxX2JEF+NzOO+q0fw5G3j+dUd5/HENwqYe+VwRgxImWy/Tm48DCo9Oo+LSR7nTzR+f82ygpXAYPTknYsPRD8ORM9km5azLI4/VI+e/FrsEZkpFmsaxneYLtLQhOsEP24R/yjwTeBLwHNWmq8GtLNL/PelHo54jDyfM7Yfsoj/CHCWdJA/G/svESntBZf4a3xk5Gzj+DIPCbVC9i8TiZaQw4lU3IIwCXKyMvjmtLOZd81ILjynL/16ZZGVGWFgXg5XjO9P+Y1juE6dmaoO8O0Q1gzRqfuN7fOUUhkB5L9MRoVM9Cy1i1XAPtGXpgX8ZxkR9gE/F1nm4mzRyl44JsfmSCNe4qHzbwy4r7eFRLtFKpgWslE08WhLaiH6+1HR8TMkLIh1P35YJXlOA5RHeS82rP7Xjf2/F/myW0bDWVa6mQHX/DfR/peJETZxlozcFdJpa63j9ziOM10+te0h/y1Ar1BB1uLhXDKmn3+GkQg3XTqEqRPOSAX5e4XQeYh+r7LSjZbfU+R7jzHsXmZYsl4ekudqY18TsEU6ifvZ5UMIG78SArvYINLBxEUBt1YgeXtFRe6WvKda+2sta98svoeJSwMiaw8aFnQTOmZuBwZcCZZj6XOzjnoAdSHu85A1yi70OGdwR2hrl/xXhTn5/BF5TDy3X6iMvz5xKP16ZaWijFeFPO81a/vTSqnBwDmy/Rdgs/weqpQabll90MsHsJyvDGnYtcbnIR9CeIURbdhD+6AE6+NtsYCPy/ZY6/gG6bAm1lvb2eIIemG3tb3D2s70qCM3OLDW+uSHqKOdwClj+4iH3OrVEeTPMixgfG8rAWuem53BpHH5vLjmw2TL+OmQ5y33SBexCHDCiEpcINrU1PXVUieJVrZfPP+Ujw/gF3Sw8ZREc+rRq2R/LzLIdBz7ekRlvKyrV3gyDPzCsf3baWhteAU0mk5HVCXL0G9xMXZwYpwYO6S3EclrN0L1OMdxdiql3jFCfQWWbn9DSDRDtoussGClkKpBHFpzSN8e5/Jb/WxAiPvZH5DvbSFu/bBHVIYQ+5JtmMMe91EfcH5tB3E4kiz5Q+mT3j0yE8q8T4LnxyljWOtvkn+QYUnewFjXIZZ/pIfed8k81nKQd7aj7OeFkHHvJlk/dvrzpeOeDPBJDspIlwy2WdtPJxCdSyX6tzdhQksWDh5tSCjzAwmenwKYun+cWHeAasdxDkoHcIdZRcvam0bg1QAJ9RPCLcXOsbZnSNTExbW0XZLwWpL3/Kq13Re9dNeFO3tq+zaNSV63ytq+Ex267WjYI84Np8Oq8ubOI0wpCN/R3toZvOAwMyNCY1NKnyFeITo7WyRHrklmx3HqlVKORB7yLUl00Nh+DL2ozDUOV4r0qRKHsEmcsqXomVo/xyxLiLZayvRZDy2+xOdewlbMZvTM8nRj3w/F0d8o0bJxVr5lKajrd2W0nGb4EMvFJ3kLHY9vRC+//rWP/9MebLZ8tblKqajc1xjHcQ51CPl/s3Yfk8f1JxJCZR2oP8Wf3j3oeaxHdgalV32K80fksffQSX5UuZ2tHx5PulYcxzmqlPojevGUn5Va4RF2e8Xa3gTMFxKZuvl667x5Ys0rPYpzVAifg56p9MJdPg6q2yHDYq6MZGcZI7rf7PIDVodNBrcDDq1XaV4iHxPXoyctU4EXPfIa0B79nxEQIWiDvYdOhCJ+U1Mzj722gxMN3k77dHUmF4zqS2ZGhGH5udw5NXD93KEEK8eWEcdpPclT5dWvPfY9jJ4MCrp+Nq3X9vS1OtBcn8jFSZEJz/jke5zgiag2TYOetV4VcM5RKc/3SB12oNferIlz3nTahpXbi5+jl3KkzJmMO8RmRCI8M7dltDnZ0EROlrfLkJER4WSDf7RqUF5raTykX24qpc9SWj/mt8txnJOWRf2usX0KeNMnrx+hJ6W+KuQaLISvR098rbI6zkJaJmS2iaT5K3p2dwI6bOigZ4i3eFzvFHrJwrdI/Hnn7WJxv4Ce8R2NXi27Gx0i/QV6htrGdz06ElYUzBzCV1rH35FRp1ic+XFy3UYJErwlcsit443WNfd6lKnMakPTuW6Qe7wFPRmZLxJ0A96rR/3DRLKq8yBt48WtMHXCGcy+XI+qs57cQHZmhEnj8ikY2pteuZnU1Z9i3Y4j5GZl8I+T9RLrmx5/k1ONbfvVtMIBzJrcsgy7av1+Fr6+K8jy94OOeXtDGt0XWfG0Up8emUQvHMwXP6Nl1V0/28iR4zqK84JTywvW+bnZLeSfUtCf5etbh7FHDOz5MfGrtx5m7fYjVK3fn26JNDqN/Hl+Jzw0YwyDRZZ857nN7D14IjDDE6eaeOD5LTxw/TmUXHEWW2qPUVN7/OOO8fCN5wKweMVuXn1zX5gy5qWbKY2OJL8veubqiaojHzXwzp5wr4/ZsKuep1bs5tYpwyifeS4vr/2Qvr2y6JnTMun1+obQ1j6UBx+tWFdMS1zfD3Wx0sJFVjozcgP6gZCakGULSlNES9y73CPtKPTzCqCXPNd1UBub12lTju4sJeOSv/ylrVxe0J/X3z6QUMa/23iAW6doefOlz7Z+XnnBc5s9fYEkUUT8+HWVEA0fJwv0+p6w5A9KU2ccr6LtE1BROV7j0zlSSf6ygE6YJr8f3tt7jPf2Hks44z65WTQ0NZOV0dZw33zpEBY8tznV91KNjs3bxFxkEDPIurppa1JUnhopU5EQ3SZ/iVG+jkSNVS9pWORvIPlXF7Y2wyPzPIkPMG5ob/J6ZnH4eKjlD6FOipUWVmHE8KMV61zyx+SYu3+eYY3d33MCZE2xNXIkYj1jQv4Si4BFYpHdc5DrRGV/jeyv8pBYdrmLjHSuEVgUohOPAkqiFeuKxChUmZIwWrHOlmUlUsYaoDxWWljTVci/n8TXlQciNzt42VDPnAwOh4vKHkjxPZcZFnGUQSJbwiyk7YP8xZJmTgLkL0PHoqMG0aMGkWvkOgs9RoY5xsjgVe4Yel7DLmMJ+mGTah/Z43W9aLRiXUmstFB5yKWo5U8V0/KcxCcWLkM3pDrjTe/7O8d1R09Re/hk2Kw2dNC954s1nu8hh0ZJY9dJI0cMy53Imy1qLMuORf6YlKPMkF4Ro3O5Hcev3KZ0iqBXOFZ5XM9O/7EkjJUWRtCTVHVAkTEytpKUcp5bB6MkwNAlyF+Z6ozf2XOU1VvargxoBpb8YQ8J/CfGKx107+Wx0sJyHxlTI4ToL2QpCRFJCnKyTcK7o0edkD8q1zAd30VitfM9SFxufOqMvBfK9xwpt588c69X53ayWGlhtTUqePpDUl9dTvP/DL3gKaWPiz1auZ0bLhjE5IJ8+vfOZvu+j3h25V7WbDscNovjUraOQHWc4yWirUcleZ2YENPuRDEhYL5hkZdbow8e16+2OoLrP5RYHW6+zz3m+9x/tc/1iJUW1tEF4ZL/A/RrMf49lZk3NDbz7Mq9PLtyb3uz+AHJP3TRHhQbmrjcIMbSduRlWvhiw5LHPM6r8hgxquN04HOMvItomV9YGkeX58fZ7vIwvdIfopeL/q3gRVKz7rxdwSrLgsaSJEfMkhw1HuTOF7lTLucXy74g8s8zRos5ItVm+Flwq1MVWVIu6tMpuyzM8GajVNzjwK2dXK6n0Q+TNHbS9eusEaCO5F7haEucRRYZ3fkAR4650ZV8gmP0+ZbFN8tZFTBaVEm65dGKda508p0F7g6WH/TbDW5DPyywoxPKs0OufauUpbOwyCBoCS1x+hrLSrbH+ntZ1zlCSDe8WCTb8d6cPF/Imi+jQJnkUWWMAF6YIffnRn6icm+fF+e3W8B+Ua2JnuhX3s1Hr8/uSNRLIzxCwJrsjliHEufP+IoM6XE6nL5RRiQoERLmGxKmhvCz1G66uu5E+jDkdzEU/UatmaT+Twya0W81uxf9fshg05lez59GB8oeL+wBbkK/4i6VfyG0SvK8OQzx00ijM8jvYiX6MbnZeD8OFxbui2Avpe0jcWmk8TdJftAPYy9G/4/TEyT2WrlGSTMG/Rq+pnT1p/FJIr+LOvRf9SjavsXXC79FvyHtDlo/DJ1GGp2GZJcxr0X/ucJE9NP0k9Dvq4eWF6v+lHD/XZVGGqcVkebm5nQtpJGWPWmk0Z3w/wMAcSBvEHYiq0wAAAAASUVORK5CYII=')",
            'background-repeat': 'no-repeat',
            'background-position': 'center center',
            'z-index': '1',
            'opacity': '0.3'
        });

        wrapper.prepend(trialUiWrapper);

        wrapper.on('mouseenter', function () {

            trialUiWrapper.stop(true, true);
            trialUiWrapper.hide();

        });

        wrapper.on('mouseleave', function () {

            trialUiWrapper.stop(true, true);
            trialUiWrapper.fadeIn();

        });

        wrapper.data('check-trial-ui', setInterval(function () {

            if (wrapper.find('.WEBPONENT-TRIAL-UI').length === 0) {

                clearInterval(wrapper.data('check-trial-ui'));
                appendTrialUi(wrapper[0]);

            }
        }, 5000));
    }

    function makeLicenseObject(text) {

        var obj = {};

        var splitedArray = text.split(';');

        obj.product = splitedArray[0];
        obj.customer = splitedArray[2];
        obj.licenseType = splitedArray[3];
        obj.domains = splitedArray[5];
        obj.expireDate = splitedArray[6];

        return obj;
    }

    var TRIAL_UI = false;

    var decodedLicenseKey = decodeStr(WEBPONENT_CHART_LICENSE_KEY);

    var licenseObject = makeLicenseObject(decodedLicenseKey);

    var domain = window.location.host.toUpperCase();

    if (licenseObject.licenseType === 'TRIAL') {

        if (domain.indexOf('LOCALHOST') !== 0) {
            TRIAL_UI = true;
        }

        if (new Date() > new Date(licenseObject.expireDate * 1)) {

            alert(productName + ' ' + licenseObject.licenseType + '버전의 라이센스 유효기간이 지났습니다.');
            return;
        }

    } else if (licenseObject.licenseType === 'DEVELOP') {

        if (new Date() > new Date(licenseObject.expireDate * 1)) {

            TRIAL_UI = true;
        }
        /**
         licenseType ED시리즈 조건 추가(ver.150915 평다진)
         */
    } else if (licenseObject.licenseType === 'OFFICIAL' || licenseObject.licenseType === "ED001" || licenseObject.licenseType === "ED002" || licenseObject.licenseType === "ED003") {

        if (domain.indexOf('LOCALHOST') !== 0) {
            TRIAL_UI = true;
        }

        var splitedDomain = licenseObject.domains.split(',');

        for (var i = 0; i < splitedDomain.length; i++) {

            var regesteredSite = splitedDomain[i];

            if (domain.indexOf(regesteredSite) > -1) {

                TRIAL_UI = false;
            }
        }
    } else if (licenseObject.product !== productId) {

        TRIAL_UI = true;

    } else {

        alert('유효하지 않은 ' + productName + ' 라이센스입니다.');
        TRIAL_UI = true;
    }

    (function() {

        var self = {};
        var elementType = getElementType();
        var lineError = getLineError();


        function getDefaultStyles () {

            var defaultStyles = {

                layout : {
                    position : {
                        x : 0,
                        y : 0
                    },
                    area : {
                        color : '#f8f8f8',
                        opacity : 1
                    },
                    line : {
                        color : '#eaeaea',
                        width : 1
                    }
                },
                radar : {
                    radius : 70,
                    area : {
                        color : [
                            '#28a9a5', '#3db4af', '#5bc4c0', '#82d2cf',
                            '#ace1df', '#c8ebea', '#d9f1f0'
                        ]
                    },
                    line : {
                        color : '#fff',
                        width : 3
                    },
                    animate : {
                        use : true,
                        step : 80,
                        type : 'easeInOutExpo' /* linear | easeInOutExpo | none */
                    },
                    hover : {
                        use : true,
                        area : {
                            color : '#138b87'
                        }
                    },
                    startAngle : 90
                },
                tick: {
                    style: 'circle',
                    size: 2,
                    overSize: 1.5,
                    area: {
                        color: '#ff625f',
                        opacity: 0.6
                    },
                    line: {
                        color: '#ff625f',
                        width: 3,
                        opacity: 0.6
                    }
                },
                legend : {
                    use : true,
                    stackedGap : 5,
                    text: {
                        family: 'Nanum Gothic',
                        size: 12,
                        color: '#333333',
                        style: 'normal',    /* normal | italic */
                        weight: 'bold',   /* normal | bold */
                        opacity: 1
                    }
                },
                innerLegend : {
                    use : true,
                    lineNum : 5,
                    text: {
                        family: 'Nanum Gothic',
                        size: 10,
                        color: '#333333',
                        style: 'normal',    /* normal | italic */
                        weight: 'bold',   /* normal | bold */
                        opacity: 1
                    }
                }
            };

            return defaultStyles;
        }

        /**
         * 기본으로 설정되어 있는 옵션 반환
         * @return {defaultOptions} default options
         */
        function getDefaultOptions () {
            var defaultOptions = {
                data : {
                    data : null,
                    url: null,
                    type: null,
                    reverse: false,
                    jsonDepth: 'output.result',
                    use : null,
                    gubun : null,
                    gubunOption : null,
                    dataLen: null
                },
                legend : {
                    format : null,
                    func : null
                },
                toolTip : {
                    use : true,
                    className : null,
                    position : {
                        x : 0,
                        y : 0
                    },
                    func : null
                },
                timeSlice : {
                    use : false,
                    delay : 300,
                    animate : {
                        type : 'linear', /* linear|>|<|<>|bounce|elastic|backln|backOut|none */
                        speed : 150
                    },
                    slider : null,
                    play : null,
                    pause : null,
                    stop : null,
                    data : null
                },
                resize : {
                    use : false,
                    func : null
                },
                func : {
                    tickClick : null
                }
            };

            return defaultOptions;
        }

        function cloneSettingModel () {

            /**
             * radar 의 세팅 정보를 담고 있다.
             * @type {Object}
             */
            var settingModel = {

                /**
                 * 데이터와 관련된 정보를 나타낸다.
                 */
                data : {

                    dividedData : null,

                    renderedData : null,

                    renderedDataIndex : null,

                    dataTotalValue : null,

                    max : null,

                    maxIndex : null
                },

                animation : {

                    firstDraw : null,

                    timeSlice : null
                },

                legend : {

                    tipAttrArray : []
                },

                radar : {

                    hover : {

                        color : null
                    }
                },

                wrapper : {

                    width : null
                }
            };

            return settingModel;
        }


        function bindEvents(wrapper, radar) {
            radar.event.on('drawCompleted', function (e, radar) {

                if (radar.options.timeSlice.slider != null) {
                    radar.options.timeSlice.slider.slider('option', {disabled : false});
                }

                radar.trigger('drawCompleted');
            });

            /**
             * radar 를 redraw 할 때 발생하는 이벤트
             */
            radar.event.on('reDraw', function (e, radar) {


            });

            var waitForFinalEvent = (function () {

                var timers = {};

                return function (callback, ms, uniqueId) {

                    if (!uniqueId) {

                        uniqueId = "Don't call this twice without a uniqueId";
                    }

                    if (timers[uniqueId]) {

                        clearTimeout (timers[uniqueId]);
                    }

                    timers[uniqueId] = setTimeout(callback, ms);
                };
            })();

            /**
             * radar 의 resize 이벤트
             */
            if (wrapper.data('resizeEventName')) {

                $(window).off(wrapper.data('resizeEventName'));
            }

            var wrapperUniqueId = getUniqueID();

            wrapper.data('resizeEventName', 'resize.' + wrapperUniqueId);

            $(window).on(wrapper.data('resizeEventName'), function (e) {

                var afterWrapperWidth = radar.settings.wrapper.width;
                var beforeWrapperWidth = radar.wrapper.width();

                if (afterWrapperWidth !== beforeWrapperWidth) {

                    if (radar.options.resize.use) {

                        waitForFinalEvent(function() {

                            radar.resize();

                        }, 500, "some unique string");
                    }

                    radar.settings.wrapper.width = radar.wrapper.width();
                }
            });
        }
        /**
         * defaultStyles 와 radar 스타일을 extend 시켜준다.
         * @param  {Object} style [radar 스타일]
         * @return {Object}       [extend 되어진 스타일]
         */
        function extendStyles (style) {

            var defaultStyles = getDefaultStyles();

            var styles = $.extend(true, defaultStyles, style);

            if( elementType === 'VML') {

                styles.legend.text.family = 'Dotum';
            }

            return styles;
        }

        /**
         * defaultOptions 와 radar 옵션을 extend 시켜준다.
         * @param  {Object} option [radar 옵션]
         * @return {Object}        [extend 되어진 옵션]
         */
        function extendOptions (option) {

            var defaultOptions = getDefaultOptions();

            var options = $.extend(true, defaultOptions, option);


            return options;
        }
        /**
         * 브라우져 환경에 따라 SVG 인지 VML 인지 구분해준다.
         * @return {String} ['SVG' or 'VML']
         */
        function getElementType () {

            var g = {doc: document, win: window};
            var elementType = (g.win.SVGAngle ||
            g.doc.implementation.hasFeature(
                "http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ?
                "SVG" : "VML");

            return elementType;
        }
        function getLineError () {

            var lineError = 0;

            if ( elementType == 'SVG' ) {

                lineError = 0.5;
            }

            return lineError;
        }
        function loadText (data2, options) {

            var arr = [];
            var data = data2;
            var lineArr = data.split('\n');
            var dataTitles = [];
            var titleCheck = true;

            for ( var i = 0; i < lineArr.length; i++) {

                if (lineArr.length <= 1) {

                    continue;
                }

                var objArr = lineArr[i].split('|');

                if (titleCheck) {

                    for ( var j = objArr.length; j--;) {

                        dataTitles.unshift(trim(objArr[j]));
                    }

                    titleCheck = false;

                } else {

                    var obj = {};

                    if (objArr.length <= 1) {

                        continue;
                    }

                    $.each(objArr, function(j, item) {

                        obj[dataTitles[j]] = trim(item);
                    });

                    arr.push(obj);
                }
            }

            return arr;
        }
        function loadJson (data, options) {

            var bld_depth = options.data.jsonDepth.split('.');
            var outPut = bld_depth[0];
            var result = bld_depth[1];

            var arr = data;

            for (var i = 0; i < bld_depth.length; i++) {

                arr = arr[bld_depth[i]];
            }

            return arr;
        }
        /**
         * AJAX 를 이용하여 데이터를 읽어온다.
         * @param  {Object} options [radar 옵션]
         * @return {Array}         [파싱된 데이터 반환]
         */
        function loadData (options) {

            var data = [];

            if (options.data.data) {

                data = options.data.data;

            } else {

                $.ajax({
                    url : options.data.url,
                    async : false,
                    dataType : options.data.type,
                    jsonp : "callback",
                    success : function (resp) {

                        if (options.data.type == "json") {

                            data = loadJson(resp, options);

                        } else if (options.data.type == "text") {

                            data = loadText(resp, options);
                        }
                    },
                    error : function(e) {

                    }
                });
            }

            if ( options.data.dataLen ){
                if( data.length > options.data.dataLen ) {
                    var i = data.length - options.data.dataLen;
                    data.splice(0,i);
                }
            }
            return data;
        }

        function setWrapper (radar) {
            radar.settings.wrapper.width = radar.wrapper.width();
            radar.settings.wrapper.height = radar.wrapper.height();
        }

        function drawSvg (radar) {
            var svgElement = null;

            var styles = radar.styles;
            var svgWidth = Math.floor(radar.wrapper.width()) - lineError;
            var svgHeight = Math.floor(radar.wrapper.height()) - lineError;

            svgElement = Raphael(radar.wrapper[0], svgWidth, svgHeight);
            radar.svg = svgElement;

            radar.svg.canvas.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');

            return svgElement;
        }

        function drawLayout (radar) {

            var styles = radar.styles;
            var width = Math.floor(radar.wrapper.width()) - lineError;
            var height = Math.floor(radar.wrapper.height()) - lineError;

            if (elementType === "VML") {

                width = width - (styles.layout.line.width / 2) - 1.5;
                height = height - (styles.layout.line.width / 2) - 1.5;
            }

            radar.items.layout = radar.svg.rect(0, 0, width, height);

            radar.items.layout.attr({
                fill : styles.layout.area.color,
                opacity: styles.layout.area.opacity,
                stroke : styles.layout.line.color,
                'stroke-width' : styles.layout.line.width
            });
        }
        function noData (radar) {

            var x = radar.wrapper.width() / 2;
            var y = radar.wrapper.height() / 2;
            var text = radar.svg.text(x, y, '데이터가 로드되지 않았습니다.');

            text.attr({
                'font-family': 'dotum',
                'font-size': 12,
                fill: '#000'
            });
        }
        function removeComma (radar) {

            var options = radar.options;
            var use = options.data.use;
            var data = radar.data;
            var dataLen = data.length;

            for (var i = 0; i < dataLen; i++) {

                var dataI = data[i];

                if (typeof dataI[use] == 'string') {

                    dataI[use] = Number(dataI[use].split(',').join(''));

                } else {

                    dataI[use] = Number(dataI[use]);
                }
            }
        }

        function setDividedData (data, options) {

            var gubun = options.data.gubun;
            var gubunDataArr = [];
            var arrIndex = 0;
            var index = 0;

            gubunDataArr[0] = [];
            gubunDataArr[0][0] = data[0];

            var dataLen = data.length;

            for (var i = 1; i < dataLen; i ++ ){

                var dataI = data[i];

                if (dataI[gubun] == data[i - 1][gubun]) {

                    index += 1;

                    gubunDataArr[arrIndex][index] = dataI;

                } else {

                    arrIndex += 1;
                    index = 0;

                    gubunDataArr[arrIndex] = [];

                    gubunDataArr[arrIndex][index] = dataI;
                }
            }

            return gubunDataArr;
        }

        /**
         * 현재 렌더링된 데이터를 가져온다.
         * @param  {Object} radar 객체
         */
        function getRenderedData (radar) {

            var options = radar.options;
            var dividedData = radar.settings.data.dividedData;
            var dataLen = dividedData.length;
            var gubun = options.data.gubun;
            var gubunOption = options.data.gubunOption;

            for (var i = dataLen; i--;) {

                var dataI = dividedData[i];

                if (dataI[0][gubun] == gubunOption) {

                    radar.settings.data.renderedData = dataI;
                    radar.settings.data.renderedDataIndex = i;
                }
            }
        }

        /**
         * radar 의 데이터 중 최대값을 구한다.
         * @param {Object} radar 객체
         */
        function setMaxData (radar) {

            var options = radar.options;
            var renderedData = radar.settings.data.renderedData;
            var use = options.data.use;
            var max = Number(renderedData[0][use]);
            var maxIndex = 0;

            var dataLen = renderedData.length;

            for (var i = 0; i < dataLen; i++) {

                if ( max < Number(renderedData[i][use])) {

                    max = Number(renderedData[i][use]);
                    maxIndex = i;
                }
            }

            radar.settings.data.max = max;
            radar.settings.data.maxIndex = maxIndex;
        }

        /**
         * radar 의 데이터 중 최소값을 구한다.
         * @param {Object} radar 객체
         */
        function setMinData (radar) {

            var options = radar.options;
            var renderedData = radar.settings.data.renderedData;
            var use = options.data.use;
            var min = Number(renderedData[0][use]);
            var minIndex = 0;

            var dataLen = renderedData.length;

            for (var i = 0; i < dataLen; i++ ) {

                if ( min > Number(renderedData[i][use])) {

                    min = Number(renderedData[i][use]);
                    minIndex = i;
                }
            }

            radar.settings.data.min = min;
            radar.settings.data.minIndex = minIndex;
        }

        function settingData (radar) {
            removeComma(radar);

            if ( radar.options.data.reverse ) {

                radar.data.reverse();
            }

            if (radar.options.data.gubun !== null) {
                radar.settings.data.dividedData = setDividedData(radar.data, radar.options);

                if (radar.options.data.gubunOption !== null) {

                    getRenderedData(radar);

                } else {

                    radar.settings.data.renderedData =
                        radar.settings.data.dividedData[
                        radar.settings.data.dividedData.length - 1];

                    radar.settings.data.renderedDataIndex =
                        radar.settings.data.dividedData.length - 1;
                }

            } else {

                radar.settings.data.dividedData = radar.data;
                radar.settings.data.renderedData = radar.data;
            }
            setMaxData(radar);
            setMinData(radar);
        }

        function getPixel (radar, percent) {

            var pixel = 0;
            var radarW = radar.wrapper.width();
            var radarH = radar.wrapper.height();
            var min = radarW;

            if (radarW > radarH) {
                min = radarH;
            }

            pixel = min / 100 * percent / 2;

            return pixel;
        }

        function drawPath(radar,startX,startY,endX,endY) {


            var styles = radar.styles;
            var segment = radar.svg.path();
            radar.items.radar.push(segment);
            var cmd = 'M' + startX + ',' + startY +
                'L' + endX + ',' + endY +
                'z';

            segment.attr({
                fill :  styles.radar.line.color,
                stroke :  styles.radar.line.color,
                "stroke-width" : styles.radar.line.width,
                "stroke-opacity" : styles.radar.line.opacity,
                "stroke-miterlimit" : 2,
                path:cmd,
                "fill-opacity" : 1
            });
        }
        function turnAng(angle,radar) {
            var startAngle = radar.styles.radar.startAngle;
            var returnAngle =angle - startAngle/90*(1/2*Math.PI);
            return returnAngle;

        }

        function drawBackground(radar) {

            var styles = radar.styles;
            var radiusSize =  radar.settings.data.renderedData.length;
            radar.items.radar = radar.svg.set();
            var centerX = radar.svg.width / 2 + styles.layout.position.x;
            var centerY = radar.svg.height / 2 + styles.layout.position.y;
            var radarRadius = getPixel(radar, radar.styles.radar.radius);

            for(var i =0;i <=radiusSize-1;i++) {
                var angle = 2/radiusSize*Math.PI*i;
                var turnAngle = turnAng(angle,radar);
                var startX = centerX ;
                var startY = centerY ;
                var endX = radarRadius*Math.cos(turnAngle)+centerX;
                var endY = radarRadius*Math.sin(turnAngle)+centerY;


                drawPath(radar,startX,startY,endX,endY);

                for(var j = 0;j < 5; j++) {
                    var radarRadiusSub = Number(radarRadius-(radarRadius/5*j)).toFixed(2);
                    var angleSub =  2/radiusSize*Math.PI*(i+1);
                    var basePolyGonX = radarRadiusSub*Math.cos(turnAng(angleSub,radar))+centerX;
                    var basePolyGonY = radarRadiusSub*Math.sin(turnAng(angleSub,radar))+centerY;
                    var endXSub =  radarRadiusSub*Math.cos(turnAng(angle,radar))+centerX;
                    var endYSub =  radarRadiusSub*Math.sin(turnAng(angle,radar))+centerY;
                    drawPath(radar,endXSub,endYSub,basePolyGonX,basePolyGonY);
                }
            }
        }

        var CalculateStarPoints = function(centerX, centerY, arms, outerRadius, innerRadius,radar){
            var results = "";

            var angle = Math.PI / arms;
            var turnAngle = turnAng(angle,radar);
            for (var i = 0; i < 2 * arms; i++) {
                var r = (i & 1) == 0 ? outerRadius : innerRadius;

                var currX = centerX + Math.cos(i * turnAngle) * r;
                var currY = centerY + Math.sin(i * turnAngle) * r;

                if (i == 0) {
                    results = currX + " " + currY;
                } else {
                    results += " L" + currX + " " + currY;
                }
            }

            return results;
        };

        function drawTick(radar,x,y,i,j) {

            var useKey = Object.keys(radar.options.data.use[j])[0]
            var styles = radar.styles;
            var options = radar.options;
            var SeriesStyles =  styles.series[j][useKey];
            var tick = null;
            var tickStyles = SeriesStyles.tick;
            var tickSize = tickStyles.size;

            var tickStyle = {
                'fill'          : tickStyles.area.color,
                'fill-opacity'  : tickStyles.area.opacity,
                'stroke'        : tickStyles.line.color,
                'stroke-width'  : tickStyles.line.width,
                'stroke-opacity': tickStyles.line.opacity,
                'display':'none'
            }

            switch(tickStyles.style){

                case "square":
                    tick = radar.svg.rect(x - tickSize, y - tickSize, tickSize * 2, tickSize * 2);
                    break;
                case "triangle":
                    tick = radar.svg.path('M'+(x - tickSize - 1) + ',' + (y - tickSize) + ','+(x + tickSize + 1) + ',' + (y - tickSize) + ','+(x) + ',' + (y + tickSize) + 'Z');
                    break;
                case "star":
                    var tickHalf = tickSize / 2;
                    if(
                        tickSize > 0) { tickSize += 1, tickHalf += 1;
                    }
                    tick = radar.svg.path('M'+CalculateStarPoints(x, y, 5, tickSize, tickHalf,radar)+'Z');
                    break;
                case "diamond":
                    if(tickSize > 0) tickSize += 1;
                    tick = radar.svg.path('M'+x + ',' + (y - tickSize) + ',' + (x - tickSize) + ',' + y + ',' + x + ',' + (y + tickSize) + ',' + (x + tickSize) + ',' + y + 'Z');
                    break;
                default :
                    tick = radar.svg.circle(x, y, tickSize);
                    break;
            }

            tick.attr(tickStyle);
            tick.data = radar.settings.data.renderedData[i]
            tick.series = radar.options.data.use[j]['s' +(j+1)];
            radar.items.circle.push(tick);


            if(styles.radar.animate.use === true && options.timeSlice.use !== true) {
                radar.items.circle.hide();
            }
            if(options.timeSlice.use===true && elementType === 'SVG') {
                radar.items.circle.hide();
                var step = (options.timeSlice.animate.use)?options.timeSlice.animate.speed:0;
                setTimeout(function () {
                    radar.items.circle.show();
                }, step);

            }
            if(options.func.tickClick != null) {
                tick.click(function(){
                    eval(options.func.tickClick)( tick.data);
                });
            }
        }

        function appendToolTip(radar) {

            var options = radar.options;

            radar.items.toolTip = $('<div>');

            if (options.toolTip.className === null) {

                radar.items.toolTip.css({
                    "background": "#465866",
                    "color": "#fff",
                    "padding": "5px 10px",
                    "border": "1px solid #fff",
                    "border-radius": "2px"
                });

            } else {

                radar.items.toolTip.attr('class', options.toolTip.className);
            }

            radar.items.toolTip.css({
                'position' : "absolute",
                'white-space': 'nowrap',
            });

            radar.items.toolTip.hide();

            radar.wrapper.append(radar.items.toolTip);

        }

        function getTipAttr(radar) {

            var styles = radar.styles;
            var options = radar.options;
            var radarPositionX = radar.svg.width / 2 + styles.layout.position.x;
            var radarPositionY = radar.svg.height / 2 + styles.layout.position.y;
            var radarRadius = getPixel(radar, styles.radar.radius);
            var data = radar.settings.data.renderedData;
            var dataLength = Number(data.length);
            var tipArray = [];

            var lineW = styles.radar.line.width;
            var use = options.data.use;

            for (var i=0; i < dataLength; i++) {

                var angle = (360 / dataLength * i) * (Math.PI /180) ;
                var turnAngle = turnAng(angle,radar);
                tipArray[i] = {};

                var tipArrI = tipArray[i];

                tipArrI.moveX = radarPositionX + (radarRadius - (lineW) / 2 ) * Math.cos(turnAngle) * 1.20;
                tipArrI.moveY = radarPositionY + (radarRadius - (lineW) / 2 ) * Math.sin(turnAngle) * 1.20;

                var _angle = turnAngle * 180 / Math.PI;

                if (_angle < 90) {

                    tipArrI.directionX = "right";
                    tipArrI.directionY = "bottom";

                } else if (90 < _angle && _angle < 180) {

                    tipArrI.directionX = "left";
                    tipArrI.directionY = "bottom";

                } else if (180 <= _angle && _angle < 270) {

                    tipArrI.directionX = "left";
                    tipArrI.directionY = "top";

                } else if (270 < _angle) {

                    tipArrI.directionX = "right";
                    tipArrI.directionY = "top";
                }


            }
            radar.settings.legend.tipAttrArray = tipArray;
        }

        function setTipArrayStacked(radar) {
            var array = radar.settings.legend.tipAttrArray;
            var styles = radar.styles;
            var textSize = Number(styles.legend.text.size);
            var arrayLen = array.length;
            var stackedGap = styles.legend.stackedGap;

            if (array[0].lineY - array[arrayLen - 1].lineY < textSize + (stackedGap / 2)) {

                var gap = (textSize - (array[0].lineY - array[arrayLen - 1].lineY)) / 2;

                array[0].lineY = array[0].lineY + gap + (stackedGap / 2);
                array[arrayLen -1].lineY = array[arrayLen -1].lineY - gap - (stackedGap / 2);
            }

            for (var i = 0; i < arrayLen - 1; i++) {

                var arr = array[i];
                var arr2 = array[i + 1];
                var directionX = arr.directionX;
                var directionY = arr.directionY;

                if (directionX === undefined) {

                    directionX = 'right';
                }

                if (directionX == 'right' && directionY == 'bottom' &&
                    arr2.directionX == 'right' && arr2.directionY == 'bottom') {

                    if (arr2.lineY - arr.lineY < textSize + stackedGap) {

                        var yInterval = textSize - (arr2.lineY - arr.lineY) + stackedGap;

                        arr2.lineY = arr2.lineY + yInterval;
                    }

                } else if (directionX == 'left' && directionY == 'top' &&
                    arr2.directionX == 'left' && arr2.directionY == 'top') {

                    if (arr.lineY - arr2.lineY < textSize  + stackedGap) {

                        var yInterval = textSize - (arr.lineY - arr2.lineY) + stackedGap;

                        arr2.lineY = arr2.lineY - yInterval;
                    }
                }

                if (directionY == 'bottom' && arr2.directionY == 'top') {

                    if (arr.lineY - arr2.lineY < textSize + (stackedGap / 2)) {

                        var gap = (textSize - (arr.lineY - arr2.lineY)) / 2;

                        arr.lineY = arr.lineY + gap + (stackedGap / 2);
                        arr2.lineY = arr2.lineY - gap - (stackedGap / 2);
                    }
                }
            }

            for (var i = arrayLen; i--;) {

                var arr = array[i];
                var arr2 = array[i - 1];
                var directionX = arr.directionX;
                var directionY = arr.directionY;

                if (directionX === undefined) {

                    directionX = 'right';
                }

                if (arr2 === undefined) {

                    arr2 = {};
                    arr2.directionX = 'right';
                }
                if (directionX == 'right' && directionY == 'top' &&
                    arr2.directionX == 'right' && arr2.directionY == 'top') {

                    if (arr.lineY - arr2.lineY < textSize  + stackedGap) {

                        var yInterval = 0;

                        yInterval = textSize - (arr.lineY - arr2.lineY) + stackedGap;
                        arr2.lineY = arr2.lineY - yInterval;
                    }

                } else if (directionX == 'left' && directionY == 'bottom' &&
                    arr2.directionX == 'left' && arr2.directionY == 'bottom') {

                    if (arr2.lineY - arr.lineY < textSize + stackedGap) {

                        var yInterval = 0;

                        yInterval = textSize - (arr2.lineY - arr.lineY) + stackedGap;
                        arr2.lineY = arr2.lineY + yInterval;
                    }
                }
            }

            for (var i = 0; i < array.length; i++) {

                array[i].lineX = Math.floor(array[i].lineX) - lineError;
                array[i].lineY = Math.floor(array[i].lineY) - lineError;
            }

            return array;
        }
        function appendLegend(radar) {
            var options = radar.options;
            var styles = radar.styles;
            var legendTextGroup = radar.svg.set();
            var tipAttr = radar.settings.legend.tipAttrArray;
            var legendUse = styles.legend.use;
            var dataUse = options.data.use;
            var legendT = styles.legend.text;
            var renderedData = radar.settings.data.renderedData;
            var anchor = 'middle';
            for(var i = 0; i < renderedData.length; i++) {

                var text = renderedData[i][legendUse];
                var tipAttrI = tipAttr[i];

                var x = tipAttrI.lineX;


                if (tipAttrI.directionX == "right") {
                    anchor = "start";
                } else if  (tipAttrI.directionX == "left"){
                    anchor = "end";
                } else {
                    anchor = "middle";
                }

                if(!legendUse) {
                    text = renderedData[i][dataUse];
                }

                if(options.legend.format != null) {
                    text = options.legend.format[i];
                }

                var legendText = radar.svg.text();

                legendText.attr({
                    x :  tipAttrI.moveX,
                    y : tipAttrI.moveY,
                    text : String(text),
                    fill: legendT.color,
                    opacity : legendT.opacity,
                    'font-family': legendT.family,
                    'font-size': legendT.size,
                    'font': legendT.size + " '" + legendT.family + "'",
                    'font-weight': legendT.weight,
                    'font-style': legendT.style,
                    "text-anchor": anchor
                });
                legendTextGroup.push(legendText);
            }
        }

        function appendInnerLegend(radar) {
            var styles = radar.styles;
            var innerLegendTextGroup = radar.svg.set();
            var legendT = styles.innerLegend.text;
            var innerLegendNum = styles.innerLegend.lineNum;
            var centerX = radar.svg.width / 2 + styles.layout.position.x;
            var centerY = radar.svg.height / 2 + styles.layout.position.y;
            var radarRadius = getPixel(radar, radar.styles.radar.radius);
            for (var i = 0 ; i<=innerLegendNum; i++) {

                var text = Math.round(styles.radar.maxValue / innerLegendNum * i);

                var legendText = radar.svg.text();

                legendText.attr({
                    x : centerX + (radarRadius / innerLegendNum * i)*Math.cos(turnAng(0,radar)) ,
                    y : centerY + (radarRadius / innerLegendNum * i)*Math.sin(turnAng(0,radar)),
                    text : String(text),
                    fill: legendT.color,
                    opacity : legendT.opacity,
                    'font-family': legendT.family,
                    'font-size': legendT.size,
                    'font': legendT.size + " '" + legendT.family + "'",
                    'font-weight': legendT.weight,
                    'font-style': legendT.style,
                });

                innerLegendTextGroup.push(legendText);
            }

        }

        function drawLegend(radar) {

            appendInnerLegend(radar);

            getTipAttr(radar);

            setTipArrayStacked(radar);

            appendLegend(radar);
            // if (radar.styles.sideLegend.use ===true) {
            //     drawSideLegend(radar);
            // }
        }

        function setTimeSlice (radar) {

            var styles = radar.styles;
            var options = radar.options;
            var timeSlice = options.timeSlice;
            var dividedData = radar.settings.data.dividedData;
            var renderedDataIndex = radar.settings.data.renderedDataIndex;

            if (timeSlice.data !== null) {

                timeSlice.data(dividedData[renderedDataIndex]);
            }

            timeSlice.slider.slider({
                range: 'max',
                min: 0,
                max: dividedData.length - 1,
                value: renderedDataIndex,
                slide: function (event, ui) {
                    clearInterval(radar.settings.animation.timeSlice);

                    renderedDataIndex = ui.value;

                    radar.setData(
                        renderedDataIndex,
                        timeSlice.animate.use,
                        timeSlice.animate.speed,
                        timeSlice.animate.type
                    );

                    if (timeSlice.data !== null) {

                        timeSlice.data(dividedData[renderedDataIndex]);
                    }
                }
            });

            timeSlice.slider.slider('option', {disabled : false});
        }

        function itemsEvents(radar) {
            var styles = radar.styles;
            var options = radar.options;
            var dividedData = radar.settings.data.dividedData;
            if (options.timeSlice.play !== null) {

                options.timeSlice.play.click(function () {
                    clearInterval(radar.settings.animation.timeSlice);
                    var renderedDataIndex = radar.settings.data.renderedDataIndex;
                    if (renderedDataIndex == dividedData.length - 1) {

                        renderedDataIndex = 0;


                        options.timeSlice.slider.slider(
                            "option", "value", renderedDataIndex);

                        radar.setData(
                            renderedDataIndex,
                            options.timeSlice.animate.use,
                            options.timeSlice.animate.speed,
                            options.timeSlice.animate.type
                        );
                    }

                    radar.settings.animation.timeSlice = setInterval(function () {

                        if (renderedDataIndex == dividedData.length - 1) {
                            clearInterval(radar.settings.animation.timeSlice);

                        } else {
                            renderedDataIndex += 1;
                            options.timeSlice.slider.slider( "option", "value", renderedDataIndex);

                            radar.setData(
                                renderedDataIndex,
                                options.timeSlice.animate.use,
                                options.timeSlice.animate.speed,
                                options.timeSlice.animate.type
                            );

                            if (options.timeSlice.data !== null) {

                                options.timeSlice.data(dividedData[renderedDataIndex]);
                            }
                        }
                    }, options.timeSlice.delay);
                });
            }

            if (options.timeSlice.pause !== null) {

                options.timeSlice.pause.click(function () {

                    clearInterval(radar.settings.animation.timeSlice);
                });
            }

            if (options.timeSlice.stop !== null) {

                options.timeSlice.stop.click(function () {

                    clearInterval(radar.settings.animation.timeSlice);

                    options.timeSlice.slider.slider("option", "value", dividedData.length - 1);

                    radar.setData(
                        dividedData.length - 1,
                        options.timeSlice.animate.use,
                        options.timeSlice.animate.speed,
                        options.timeSlice.animate.type
                    );

                    if (options.timeSlice.data !== null) {

                        options.timeSlice.data(dividedData[dividedData.length - 1]);
                    }
                });
            }
            radar.items.circle.hover(function(e) {

                if (options.toolTip.use) {
                    radar.items.toolTip.show();
                    mouseMoveFunc(e, this, radar);
                }
                if (styles.radar.hover.use) {
                    setHoverColor(e, this, radar);
                }
            },function() {
                if (styles.radar.hover.use) {
                    this.attr({
                        fill : radar.settings.radar.hover.color
                    });
                }
            });
            radar.items.circle.mousemove( function (e) {

                if (options.toolTip.use) {

                    mouseMoveFunc(e, this, radar);
                }

            }).mouseout( function(e){

                if (options.toolTip.use) {

                    radar.items.toolTip.hide();
                }
            });


        }

        function reDrawRadar(radar,usingAnimate,aniSpeed,aniType){
            var styles = radar.styles;
            var options = radar.options;
            if (styles !== undefined && styles !== null) {
                radar.styles = extendStyles(styles);
            }
            if (options !== undefined && options !== null) {
                radar.options = extendOptions(options);
                radar.data = radar.settings.data.renderedData;

            }
            var dataCnt = radar.settings.data.renderedData.length;
            var centerX = radar.svg.width / 2 + styles.layout.position.x;
            var centerY = radar.svg.height / 2 + styles.layout.position.y;
            var radarRadius = getPixel(radar, radar.styles.radar.radius);

            var maxValue = styles.radar.maxValue;
            var data = radar.settings.data.renderedData;


            for(var j = 0;j<radar.options.data.use.length;j++) {
                var useKey = Object.keys(radar.options.data.use[j])[0];
                var path ='';
                var use = radar.options.data.use[j][useKey];
                var series = radar.styles.series[j][useKey];
                console.log(series);
                if (series.use) {
                    for (var i = 0; i < dataCnt; i++) {
                        var angle = 2 / dataCnt * Math.PI * i;
                        var turnAngle = turnAng(angle,radar);
                        var x =  Number(data[i][use] / maxValue * radarRadius) * Math.cos(turnAngle) + centerX;
                        var y =  Number(data[i][use] / maxValue * radarRadius) * Math.sin(turnAngle) + centerY;
                        var lastX =  Number(data[0][use]/maxValue*radarRadius) * Math.cos(turnAng( 2/dataCnt*Math.PI*dataCnt,radar)) + centerX;
                        var lastY =  Number(data[0][use]/maxValue*radarRadius) * Math.sin(turnAng( 2/dataCnt*Math.PI*dataCnt,radar)) + centerY;
                        if (i == 0) {
                            path += 'M' + x + ',' + y;
                        } else {
                            path += 'L' + x + ',' + y;
                        }
                        if(i==(dataCnt-1)) {
                            path  +='L' + lastX + ',' + lastY;
                        }
                    }
                }
                console.log(radar.items.radar.itemPath);
                if(usingAnimate ===true ) {
                    radar.items.radar.itemPath[j].animate({
                        'path' : path,
                        fill :  colorConstructor(series.area.color),
                        stroke :  series.line.color,
                        "stroke-width" :series.line.width,
                        "fill-opacity": series.area.opacity,
                        "stroke-opacity" :series.line.opacity

                    },aniSpeed);
                } else {
                    radar.items.radar.itemPath[j].attr({
                        'path' : path,
                        fill :  colorConstructor(series.area.color),
                        stroke :  series.line.color,
                        "stroke-width" :series.line.width,
                        "fill-opacity": series.area.opacity,
                        "stroke-opacity" :series.line.opacity
                    });
                }

                drawTickFunc(radar);
            }

            if (styles.legend.use) {
                drawLegend(radar);
            }

            if (options.toolTip.use) {
                appendToolTip(radar);
            }

            itemsEvents(radar);
        }

        var animOptions = {

            linear : function (t) {

                return t;
            },

            easeInOutExpo : function (t) {

                var v = t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;

                return (v > 1) ? 1 : v;
            }
        };

        function animationOption(t,styles) {

            var animOption = t > 1 ? 1 :t;

            return animOption;
        }
        function setRadarAnimate(radar,animationDecimal,inside) {
            var styles = radar.styles;
            var dataCnt = radar.settings.data.renderedData.length;
            var centerX = radar.svg.width / 2 + styles.layout.position.x;
            var centerY = radar.svg.height / 2 + styles.layout.position.y;
            var radarRadius = getPixel(radar, radar.styles.radar.radius);

            var maxValue = styles.radar.maxValue;
            var data = radar.settings.data.renderedData;


            for(var j = 0;j<radar.options.data.use.length;j++) {
                var useKey = Object.keys(radar.options.data.use[j])[0];
                var path ='';
                var use = radar.options.data.use[j][useKey];
                var series = radar.styles.series[j][useKey];
                if(series.use) {
                    var firstPath='';
                    for(var i =0;i<dataCnt;i++) {

                        var angle = 2/dataCnt*Math.PI*i*animationDecimal;
                        var turnAngle = turnAng(angle,radar);
                        var x = Number(data[i][use]/maxValue*radarRadius) * Math.cos(turnAngle) + centerX;
                        var y = Number(data[i][use]/maxValue*radarRadius) * Math.sin(turnAngle) + centerY;
                        var lastX =  Number(data[0][use]/maxValue*radarRadius) * Math.cos( turnAng(2/dataCnt*Math.PI*dataCnt*animationDecimal,radar)) + centerX;
                        var lastY =  Number(data[0][use]/maxValue*radarRadius) * Math.sin( turnAng(2/dataCnt*Math.PI*dataCnt*animationDecimal,radar)) + centerY;
                        if(i==0) {
                            firstPath = 'M' + centerX + ',' +centerY;
                            path += x + ',' +y;
                        } else {
                            path +='L' + x + ',' + y;
                        }
                        if(i==(dataCnt-1)) {
                            path  +='L' + lastX + ',' + lastY;
                        }
                        inside[j].attr({
                            'path' : firstPath+'L'+path,
                            fill :  colorConstructor(series.area.color),
                            stroke :  series.line.color,
                            "stroke-width" :series.line.width,
                            "fill-opacity": series.area.opacity,
                            "stroke-opacity" :series.line.opacity
                        });
                    }
                    inside[j].attr({
                        'path' : 'M'+path,
                        fill :  colorConstructor(series.area.color),
                        stroke :  series.line.color,
                        "stroke-width" :series.line.width,
                        "fill-opacity": series.area.opacity,
                        "stroke-opacity" :series.line.opacity
                    });
                }


            }

        }
        function getSeriesPath(radar) {
            var seriesLength = radar.options.data.use.length;
            radar.items.radar.itemPath = radar.svg.set();

            var returnPath = new Array();

            for(var i=0;i<seriesLength;i++) {
                returnPath[i] =  radar.svg.path();
                radar.items.radar.itemPath[i] = returnPath[i];

            }
            return  returnPath;
        }
        function animateLoop(radar) {

            var styles = radar.styles;
            var inside = getSeriesPath(radar);
            var animCount = (styles.radar.animate.use) ? 0 :1;
            var num = 1 / styles.radar.animate.step;
            var animFrameAmount = (styles.radar.animate.use) ? num: 1;

            radar.settings.animation.firstDraw = setInterval(function () {
                animCount += animFrameAmount;

                var animFunction = animationOption(animCount, styles);

                if (animCount >= 1) {
                    clearInterval(radar.settings.animation.firstDraw);

                    radar.items.circle.show();
                }
                setRadarAnimate(radar,animFunction,inside);
            }, 10);
        }
        function drawTickFunc(radar) {
            var styles = radar.styles;
            radar.items.circle = radar.svg.set();
            var dataCnt = radar.settings.data.renderedData.length;
            var centerX = radar.svg.width / 2 + styles.layout.position.x;
            var centerY = radar.svg.height / 2 + styles.layout.position.y;
            var radarRadius = getPixel(radar, radar.styles.radar.radius);
            var maxValue = styles.radar.maxValue;
            var data = radar.settings.data.renderedData;

            for(var j = 0;j<radar.options.data.use.length;j++) {
                var useKey = Object.keys(radar.options.data.use[j])[0]
                var inside =  radar.svg.path();
                var use = radar.options.data.use[j][useKey];
                var series = styles.series[j][useKey];


                if(series.use) {
                    for(var i =0;i<dataCnt;i++) {
                        var angle = 2/dataCnt*Math.PI*i;
                        var turnAngle = turnAng(angle,radar);
                        var x = Number(data[i][use]/maxValue*radarRadius) * Math.cos(turnAngle) + centerX;
                        var y =  Number(data[i][use]/maxValue*radarRadius) * Math.sin(turnAngle) + centerY;
                        drawTick(radar,x,y,i,j);
                    }
                }
            }
            // radar.items.circle.toFront();
        }
        // function drawSideLegend(radar) {
        //     var styles = radar.styles;
        //     var options = radar.options;
        //     var x = radar.svg.width + styles.layout.position.x - (styles.sideLegend.layout.width) - 10;
        //     var y = styles.layout.position.y + 10 ;
        //     var sideLegend = radar.svg.rect( x , y,styles.sideLegend.layout.width,styles.sideLegend.layout.height);
        //     sideLegend.attr({
        //         fill : styles.sideLegend.layout.area.color,
        //         opacity: styles.sideLegend.layout.area.opacity,
        //         stroke : styles.sideLegend.layout.line.color,
        //         'stroke-width' : styles.sideLegend.layout.line.width
        //     });
        //     var textX = x + 10;
        //     var textY = y + 10;
        //     var text ='';
        //
        //     for(var i = 0;i<options.data.use.length;i++) {
        //         var useKey = Object.keys(radar.options.data.use[i])[0];
        //         text = options.data.use[i]['s'+(i+1)];
        //         textY += styles.sideLegend.text.size+2;
        //         var sideLegendText = radar.svg.text(textX, textY,text);
        //         var seriesStyles=   styles.series[i][useKey];
        //         sideLegendText.attr({
        //             'font-family': styles.sideLegend.text.family,
        //             'font-size': styles.sideLegend.text.size,
        //             fill : styles.sideLegend.text.color,
        //             weight :styles.sideLegend.text.weight,
        //             'text-anchor' : 'start'
        //         });
        //         var textCircleX = textX + sideLegendText.getBBox().width+styles.sideLegend.text.size;
        //         var sideLegendCircle = radar.svg.circle(textCircleX,textY,styles.sideLegend.text.size/2);
        //         sideLegendCircle.attr({
        //             fill : seriesStyles.tick.area.color,
        //             stroke :seriesStyles.tick.area.color
        //         });
        //
        //
        //     }
        //     sideLegend.attr({
        //         height: textY + 10
        //     });
        //
        //
        // }
        function drawItems(radar) {
            var styles = radar.styles;
            var options = radar.options;

            if(styles.radar.animate.use===true && elementType === 'SVG') {
                animateLoop(radar);
            } else {
                setRadarAnimate(radar,1,getSeriesPath(radar));
            }

            if (options.timeSlice.use) {

                setTimeSlice(radar);
            }

            if (styles.legend.use) {
                drawLegend(radar);
            }

            if (options.toolTip.use) {
                appendToolTip(radar);
            }

            drawTickFunc(radar);


        }

        function getMousePosition (e) {

            var m = {};

            e = e || window.event;

            if (elementType === 'VML') {

                var target = e.target || e.srcElement,
                    rect = target.getBoundingClientRect(),
                    parent = target.parentNode,
                    parentRect = parent.getBoundingClientRect()

                m.x = e.offsetX + rect.left - parentRect.left;
                m.y = e.offsetY + rect.top - parentRect.top;

                // m.x = Math.round(e.x) + 0.5;
                // m.y = Math.round(e.y) + 0.5;

            } else {

                var appName = navigator.appName.toLowerCase();
                var userAgent = navigator.userAgent.toLowerCase();

                if (userAgent.indexOf('firefox') > - 1) { // FireFox

                    m.x = Math.round(e.layerX);
                    m.y = Math.round(e.layerY);

                } else if (appName === 'opera') { // Opera

                    var target = e.target || e.srcElement,
                        rect = target.getBoundingClientRect(),
                        parent = target.parentNode,
                        parentRect = parent.getBoundingClientRect();

                    m.x = e.offsetX + rect.left - parentRect.left;
                    m.y = e.offsetY + rect.top - parentRect.top;

                } else { // etc

                    m.x = Math.round(e.offsetX);
                    m.y = Math.round(e.offsetY);
                }
            }

            return m;
        }

        function mouseMoveFunc(e, _this, radar) {

            var options = radar.options;
            var toolTip = radar.items.toolTip;
            var data = _this.data;
            var mousePosition = getMousePosition(e);
            if (options.toolTip.func !== null) {

                eval(options.toolTip.func)(radar, data, toolTip);

            } else {
                var data = '<span> ' +(data['name'])+':'+
                    (data[_this.series]) +
                    '</span><br />';

                var tipElement = '<div class="tip_data">'+ data + '</div>';

                toolTip.html(tipElement);
            }

            var toolTipWidth = toolTip.width() / 2;
            var toolTipHeight = toolTip.height();

            toolTip.css({
                top : mousePosition.y - toolTipHeight + options.toolTip.position.y - 30,
                left : mousePosition.x - toolTipWidth + options.toolTip.position.x - 10
            });

            var toolTipWidth = toolTip.width() / 2;
            var toolTipHeight = toolTip.height();

            var top = mousePosition.y - toolTipHeight + options.toolTip.position.y -30;
            var left = mousePosition.x - toolTipWidth + options.toolTip.position.x - 10;

            var wrapHeight = radar.svg.height-toolTipHeight;
            var wrapWidth = radar.svg.width-(toolTipWidth*2);

            if(top < 0 ){
                top =  mousePosition.y + toolTipHeight- options.toolTip.position.y - 30;
            }else if(top > wrapHeight){
                top = mousePosition.y - options.toolTip.position.y + (toolTipHeight/2)
            }

            if(left<0){
                left = 0;
            }else if(left>wrapWidth){
                left = wrapWidth;
            }

            toolTip.css({
                top : top,
                left : left
            });
        }

        function getRandomColor() {

            var letters = '0123456789ABCDEF'.split('');
            var color = '#';

            for (var i = 0; i < 6; i++ ) {

                color += letters[Math.round(Math.random() * 15)];
            }

            return color;
        }

        function colorConstructor (color, i) {

            var option = color;

            if (color.constructor == Array) {

                option = color[i];
            }

            if (option !== undefined) {

                if (option.hasOwnProperty('src')) {

                    var img = new Image();

                    img.src = option.src;

                    option = 'url(' + img.src + ')';
                }

            } else {

                option = getRandomColor();
            }

            return option;
        }
        function setHoverColor(e, _this, radar) {
            var hoverColor = colorConstructor(radar.styles.radar.hover.area.color);
            radar.settings.radar.hover.color = _this.attr('fill');

            _this.attr({
                fill :  hoverColor
            });
        }




        function setup (radar, wrapper, styles, options) {


            radar.wrapper = wrapper;

            radar.wrapper.css({
                'position' : "relative"
            });

            radar.styles = extendStyles(styles);
            console.log(radar.styles);
            // url에 hash - #exportPDF를 붙이면 애니메이션이 동작하지 않는다.
            if (window.location.hash && window.location.hash.slice(1) === "skipAnimation" ||
                getElementType() === 'VML') {

                radar.styles.radar.animate.use = false;
            }

            radar.options = extendOptions(options);

            radar.data = loadData(radar.options);

            radar.items = {};

            radar.settings = cloneSettingModel();

            setWrapper(radar);

            var svgElement = drawSvg(radar);

            drawLayout(radar);

            if (radar.data === 'error' || radar.data.length <= 0) {

                noData(radar);

            } else {

                settingData(radar);

                drawBackground(radar);

                drawItems(radar)

                itemsEvents(radar);

            }


        }

        function addApis(radar) {

            radar.on = function (eventName, callback) {

                radar.event.on(eventName, callback);
            };

            /**
             * radar 의 옵션 및 스타일을 변경한다.
             * @param {object} styles
             * @param {object} options
             */
            radar.setStylesAndOptions = function (styles, options) {

                radar.wrapper.children().remove();

                clearInterval(radar.settings.animation.firstDraw);
                clearInterval(radar.settings.animation.timeSlice);

                radar.styles = {};
                radar.options = {};
                radar.data = {};
                radar.items = {};
                radar.settings = {};

                setup(radar, radar.wrapper, styles, options);
            };

            /**
             * radar 를 다시 그릴 경우 사용
             */
            radar.reDraw = function (styles, options, redraw) {

                radar.wrapper.children().remove();

                if (styles !== undefined && styles !== null) {
                    radar.styles = extendStyles(styles);
                }
                if (options !== undefined && options !== null) {
                    radar.options = extendOptions(options);
                    radar.data = loadData(radar.options);

                }
                if (redraw !== false) {

                    clearInterval(radar.settings.animation.firstDraw);
                    clearInterval(radar.settings.animation.timeSlice);

                    setWrapper(radar);

                    var svgElement = drawSvg(radar);

                    drawLayout(radar);

                    if (radar.data === 'error' || radar.data.length <= 0) {

                        noData(radar);

                    } else {
                        settingData(radar);

                        drawBackground(radar);

                        drawItems(radar)

                        itemsEvents(radar);

                    }
                }


                radar.event.trigger('reDraw', [radar]);
            };
            /**
             * resize
             */
            radar.resize = function () {

                radar.reDraw();
            };

            /**
             * options.data.use 로 데이터가 나눠진 상태인 경우에
             * 해당 데이터의 인덱스 값을 이용해 radar 의 데이터를 변경해 준다.
             * @param {Number} idx          data index
             * @param {boolean} usingAnimate    애니메이션 사용 여부
             * @param {number} aniSpeed     애니메이션 속도
             * @param {string} aniType      애니메이션 타입
             */
            radar.setData = function (idx, usingAnimate, aniSpeed, aniType) {

                var styles = radar.styles;
                radar.settings.data.renderedData =
                    radar.settings.data.dividedData[idx];
                radar.settings.data.renderedDataIndex = idx;
                radar.items.circle.remove();
                reDrawRadar(radar,usingAnimate,aniSpeed,aniType);

            };

            /**
             * radar 차트에 실시간으로 데이터를 입력하여 그린다.
             * @param  {Array} data         데이터
             * @param  {boolean} usingAnimate 애니메이션 사용 여부
             * @param {number} aniSpeed     애니메이션 속도
             * @param {string} aniType      애니메이션 타입
             */
            radar.realTime = function (data, usingAnimate, aniSpeed, aniType) {

                radar.settings.data.dividedData.push(data);

                var idx = radar.settings.data.dividedData.length - 1;

                radar.setData(idx, usingAnimate, aniSpeed, aniType);
            };


            /**
             * radar.options.data.data 를 json 형태의 데이터로 변경
             * @param  {json} data
             */
            radar.appendData = function (data) {

                radar.options.data.data = data;

                radar.wrapper.children().remove();

                radar = self.init(radar.wrapper, radar.styles, radar.options);
            };

        }

        self.init = function (wrapper, styles, options) {

            var radar = {};

            radar.event = $({});

            bindEvents(wrapper,radar);

            setup(radar, wrapper, styles, options);

            addApis(radar);

            return radar;

        };
        if (!window.webponent){
            window.webponent = {};
        }
        if (!window.webponent.visual) {
            window.webponent.visual = {};
        }
        window.webponent.visual.radar = self;

    })();
})();
