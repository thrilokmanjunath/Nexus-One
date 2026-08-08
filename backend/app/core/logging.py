import logging
import sys
from pythonjsonlogger import jsonlogger
from opentelemetry import trace

def setup_logging():
    logger = logging.getLogger()
    logger.setLevel(logging.INFO)
    
    # Remove existing handlers
    for handler in logger.handlers[:]:
        logger.removeHandler(handler)
        
    log_handler = logging.StreamHandler(sys.stdout)
    formatter = jsonlogger.JsonFormatter('%(asctime)s %(levelname)s %(name)s %(message)s')
    log_handler.setFormatter(formatter)
    logger.addHandler(log_handler)
    
    logger.info("Structured JSON logging initialized")

def setup_tracing_stub():
    # Opentelemetry tracing stub
    tracer = trace.get_tracer(__name__)
    with tracer.start_as_current_span("app-init"):
        logging.getLogger(__name__).info("OpenTelemetry tracing stub initialized")

