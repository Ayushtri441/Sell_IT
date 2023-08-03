# -*- coding: utf-8 -*-
"""
Created on Thu Aug  3 12:54:30 2023

@author: ayush tripathi
"""

from pydantic import BaseModel
# 2. Class which describes Bank Notes measurements
class ProductName(BaseModel):
    name : str