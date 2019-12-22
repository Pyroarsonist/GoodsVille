# Stress test

Server provider: Digital ocean.

Specifications of production server:

1. 2 gb memory.
2. 1 CPU, Intel(R) Xeon(R) CPU E5-2650L v3 @ 1.80GHz.

## Results of similar requests

| Requests per second | CPU usage | Memory used |
| :-----------------: | :-------: | :---------: |
|          0          |   0.8%    |   75.9 mb   |
|         10          |   18.2%   |  116.6 mb   |
|         20          |   37.5%   |  135.7 mb   |
|         30          |   61.1%   |  134.1 mb   |
|         40          |   60.3%   |  152.9 mb   |
|         50          |   62.7%   |  158.0 mb   |
|         50          |   62.7%   |  158.0 mb   |
|         70          |    44%    |  128.2 mb   |
|         100         |   64.1%   |  138.3 mb   |
|         200         |   58.5%   |  182.9 mb   |
|         300         |   58.7%   |  160.0 mb   |

##### After 100 requests/sec the server has stopped functioning properly.

Horizontal scaling for current architecture is not possible.
Refactor scheduler mechanism and make application stateless needed.

System supports vertical scaling.
